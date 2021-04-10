import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { connectToRoom } from "../../store/actions/room-action";

const Room = () => {
  const dispatch = useDispatch();

  const { roomId } = useParams();

  useEffect(() => {
    dispatch(connectToRoom(roomId));
  }, [dispatch, roomId]);

  return <div>ROOM:{roomId}</div>;
};

export default Room;
