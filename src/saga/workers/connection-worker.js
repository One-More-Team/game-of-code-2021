import { eventChannel } from "redux-saga";
import { call, put, take, delay, fork, select } from "redux-saga/effects";
import SimplePeer from "simple-peer";
import { WSSServerMessages } from "../../enum/wss-messages";
import {
  connectedSuccessfully,
  streamReady,
} from "../../store/actions/action-test";
import {
  connectedToWS,
  CONNECTED_TO_WS,
} from "../../store/actions/websocket-actions";
import { GetUser } from "../../store/selectors/auth-selectors";
import { info } from "../../utils/logger";

// const wsUri = "wss://192.168.2.109:8081";
const wsUri = "wss://snowball-fight.herokuapp.com";
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
  yield take(CONNECTED_TO_WS);

  const user = yield select(GetUser);
  info("Display Name", user.uid);
  /* yield call(doSend, {
    header: "start",
    data: { gameMode: gameMode.toLowerCase(), userName: user.displayName },
  });
  */
}

const onClose = () => info("DISCONNECTED");

const onError = () => info("ERROR");

function* createWebSocket() {
  websocket = new WebSocket(wsUri);
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
      const command = rawData.header;

      switch (command) {
        case WSSServerMessages.READY: {
          // emit(storeCountDown(rawData.data));
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

export function* initConnectionHandler_() {
  const stream = yield getLocalStream();

  yield put(streamReady({ stream }));
  console.log("Connect to server...");

  p = new SimplePeer({
    initiator: true,
    trickle: false,
    stream,
  });

  p.on("error", (err) => console.log("error", err));

  p.on("signal", (data) => {
    console.log("Signal data was received");
    fetch("https://192.168.2.109:8081/offer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((response) => {
        const { answer, streamId } = JSON.parse(response);
        console.log(`Connection answer was received with streamId ${streamId}`);
        p.signal(answer);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const channel = new eventChannel((emit) => {
    p.on("connect", () => {
      emit(connectedSuccessfully());
      console.log("Successful connect");
      //p.send("whatever" + Math.random());
    });

    p.on("data", (data) => {
      console.log(`Data was received ${data}`);
    });

    /*socket.onmessage = (evt) => {
      const rawData = JSON.parse(evt.data);
      const command = rawData.header;

      switch (command) {
        case ServerMessages.PLAYERNUM: {
          info(
            "Player Number Updated ",
            rawData.data.playerNum,
            rawData.data.expectedPlayerNum
          );
          emit(updatePlayerNumbers(rawData.data));
          break;
        }
        default: {
          window.serverMessage(rawData);
        }
      }
    };*/

    return () => {};
  });

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}
