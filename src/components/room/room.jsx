import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { connectToRoom } from "../../store/actions/room-action";
import { GetUsers } from "../../store/selectors/room-selectors";
import Info from "../../ui/info/info";

import styles from "./room.module.scss";

const Room = () => {
  const dispatch = useDispatch();
  const users = useSelector(GetUsers);

  const { roomId } = useParams();

  useEffect(() => {
    dispatch(connectToRoom(roomId));
  }, [dispatch, roomId]);

  return (
    <div>
      <div>
        {roomId}
        {users.map(({ displayName, uid }) => (
          <Info className={styles.User} key={uid}>
            {displayName}
          </Info>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default Room;
