import { eventChannel } from "redux-saga";
import { put, take, takeLatest } from "redux-saga/effects";
import SimplePeer from "simple-peer";
import {
  initTestConnection,
  connectedSuccessfully,
  streamReady,
} from "../store/actions/action-test";

let p;

const getLocalStream = () =>
  window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

function* initConnectionHandler() {
  const stream = yield getLocalStream();

  yield put(streamReady({ stream }));
  console.log("test 2");

  p = new SimplePeer({
    initiator: true,
    trickle: false,
    stream,
  });

  p.on("error", (err) => console.log("error", err));

  p.on("signal", (data) => {
    console.log("SIGNAL", JSON.stringify(data));
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
        p.signal(JSON.parse(response));
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const channel = new eventChannel((emit) => {
    p.on("connect", () => {
      emit(connectedSuccessfully());
      console.log("CONNECT");
      //p.send("whatever" + Math.random());
    });

    p.on("data", (data) => {
      console.log("data: " + data);
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

const TestSaga = [takeLatest(initTestConnection().type, initConnectionHandler)];

export default TestSaga;
