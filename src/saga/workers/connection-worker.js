import { eventChannel } from "redux-saga";
import { call, put, take, delay, fork, select } from "redux-saga/effects";
import SimplePeer from "simple-peer";
import { WSSServerMessages } from "../../enum/wss-messages";
import {
  clearPeer,
  storePeer,
  streamReceived,
} from "../../store/actions/stream-actions";
import {
  answerForNewParticipant,
  clearParticipant,
  connectedToWS,
  finalizeConnection,
  newParticipant,
} from "../../store/actions/websocket-actions";
import { GetUser } from "../../store/selectors/auth-selectors";
import { GetRoomId } from "../../store/selectors/room-selectors";
import { GetUserStream } from "../../store/selectors/stream-selector";
import { info } from "../../utils/logger";

//const wsUri = "wss://192.168.2.109:8081/";
const wsUri = "wss://honest-meeting.herokuapp.com/";

let websocket;

/* function closeWebSocket() {
  websocket.close();
}*/

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
  const roomId = yield select(GetRoomId);
  info("Display Name", user.uid);

  websocket = new WebSocket(wsUri + roomId + "/" + user.uid);
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
          emit(finalizeConnection(rawData.data));
          break;
        }
        case WSSServerMessages.PING: {
          info("PING arriwed");
          doSend({
            event: "pong",
          });
          break;
        }
        case WSSServerMessages.LOSTPARTICIPANT: {
          info("Deleted User");
          emit(clearParticipant(rawData.data));
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

const getLocalStream = () =>
  window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

export function* handleConnectedToWS() {
  const user = yield select(GetUser);
  const stream = yield getLocalStream();
  yield put(streamReceived({ uid: user.uid, stream }));
}
export function* handleClearParticipant({ payload }) {
  const { userId } = payload;

  yield put(clearPeer({ id: userId }));
}
export function* handlefinalizeConnection({ payload }) {
  const { userId, answer } = payload;
  const { id, peer } = yield select(GetUserStream(userId));

  peer.signal(answer);

  info("visszafejtés sikeres  " + id);
}
export function* handleAnswerForNewParticipant({ payload }) {
  const { userId, offer } = payload;
  info("Answearing the offer for NP " + userId);

  const stream = yield getLocalStream();

  const answerPeer = new SimplePeer({
    trickle: false,
    initiator: false,
    stream,
  });
  answerPeer.signal(offer);

  yield put(storePeer({ id: userId, peer: answerPeer }));

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

  const streamChannel = new eventChannel((emit) => {
    answerPeer.on("stream", (stream) => {
      emit(streamReceived({ uid: userId, stream }));
    });

    return () => {};
  });

  while (true) {
    const action = yield take(streamChannel);

    yield put(action);
  }
}

export function* handleNewParticipant({ payload: userId }) {
  info("New Peer: creating " + userId);

  const stream = yield getLocalStream();

  const p = new SimplePeer({
    initiator: true,
    trickle: false,
    stream,
  });

  yield put(storePeer({ id: userId, peer: p }));

  p.on("error", (err) => console.log("error", err));

  p.on("signal", (data) => {
    console.log("Signal Created");
    doSend({
      event: "offer",
      data: {
        userId,
        offer: data,
      },
    });
  });
  const streamChannel = new eventChannel((emit) => {
    p.on("stream", (stream) => {
      emit(streamReceived({ uid: userId, stream }));
    });

    return () => {};
  });
  while (true) {
    const action = yield take(streamChannel);

    yield put(action);
  }
}
