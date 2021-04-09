import { takeLatest } from "redux-saga/effects";
import SimplePeer from "simple-peer";
import { initTestConnection } from "../store/actions/action-test";

function* initTestHandler() {
  console.log("test 2");

  const p = new SimplePeer({
    initiator: true,
    trickle: false,
  });

  p.on("error", (err) => console.log("error", err));

  p.on("signal", (data) => {
    console.log("SIGNAL", JSON.stringify(data));
    fetch("https://192.168.2.109:8081/offer", {
      method: "POST",
      body: JSON.stringify(data),
    });
  });

  yield;
}

const TestSaga = [takeLatest(initTestConnection().type, initTestHandler)];

export default TestSaga;
