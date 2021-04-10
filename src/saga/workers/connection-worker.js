import { eventChannel } from "redux-saga";
import { put, take } from "redux-saga/effects";
import SimplePeer from "simple-peer";
import {
  connectedSuccessfully,
  streamReady,
} from "../../store/actions/action-test";

let p;

const getLocalStream = () =>
  window.navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

export function* initConnectionHandler() {
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
