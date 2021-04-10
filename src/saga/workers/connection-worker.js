import { eventChannel } from "redux-saga";
import { call, put, take, delay, fork, select } from "redux-saga/effects";
import SimplePeer from "simple-peer";
import { WSSServerMessages } from "../../enum/wss-messages";
import {
  connectedSuccessfully,
  streamReady,
} from "../../store/actions/action-test";
import {
  answerForNewParticipant,
  connectedToWS,
  newParticipant,
} from "../../store/actions/websocket-actions";
import { GetUser } from "../../store/selectors/auth-selectors";
import { info } from "../../utils/logger";

const wsUri = "wss://192.168.2.109:8081/";
//const wsUri = "wss://snowball-fight.herokuapp.com";
let p;

let websocket;

function closeWebSocket() {
  websocket.close();
}

export function doSend(msgObj) {
  websocket.send(JSON.stringify(msgObj));
}

export function* initConnectionHandler() {
  // yield call(closeWebSocket);
  yield delay(500);
  info("Connecting to WSS");

  yield fork(createWebSocket);
  yield take(connectedToWS().type);

  /* yield call(doSend, {
    event: "start",
    data: { gameMode: gameMode.toLowerCase(), userName: user.displayName },
  });
  */
}

const onClose = () => info("DISCONNECTED");

const onError = () => info("ERROR");

function* createWebSocket() {
  const user = yield select(GetUser);
  info("Display Name", user.uid);

  websocket = new WebSocket(wsUri + "tibiszoba/" + user.uid);
  websocket.onclose = (evt) => onClose(evt);
  websocket.onerror = (evt) => onError(evt);

  const channel = yield call(subscribe, websocket);
  while (true) {
    const action = yield take(channel);

    yield put(action);
  }
}

function subscribe(socket) {
  return new eventChannel((emit) => {
    socket.onopen = () => {
      info("WS CONNECTED");
      emit(connectedToWS());
    };

    socket.onmessage = (evt) => {
      const rawData = JSON.parse(evt.data);
      const command = rawData.event;
      console.log("command " + command);
      switch (command) {
        case WSSServerMessages.NEWPARTICIPANT: {
          info("New Member Arriwed " + rawData.data.userId);
          emit(newParticipant(rawData.data.userId));
          break;
        }
        case WSSServerMessages.OFFER: {
          info("Offer arriwed");
          emit(answerForNewParticipant(rawData.data));
          break;
        }
        case WSSServerMessages.ANSWER: {
          info("ANSWER arriwed");
          //emit(answerForNewParticipant(rawData.data));
          break;
        }
        default: {
          // window.serverMessage(rawData);
        }
      }
    };

    return () => {};
  });
}

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

const getLocalStream = () =>
  window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

export function* handleAnswerForNewParticipant({ payload }) {
  const { userId, offer } = payload;
  info("Answearing the offer for NP " + userId);

  const answerPeer = new SimplePeer({ trickle: false });
  answerPeer.signal(offer);

  answerPeer.on("signal", (data) => {
    info("visszakuldesi adat megérkezett");
    doSend({
      event: "answer",
      data: {
        userId: userId,
        answer: data,
      },
    });
  });
}

export function* createAndSaveNewPeer({ payload }) {
  info("New Peer: creating " + payload);

  const stream = yield getLocalStream();
  const user = yield select(GetUser);

  const p = new SimplePeer({
    initiator: true,
    trickle: false,
    stream,
  });

  p.on("error", (err) => console.log("error", err));

  p.on("signal", (data) => {
    console.log("Signal Created");
    doSend({
      event: "offer",
      data: {
        userId: payload,
        offer: data,
      },
    });
  });
}
