import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { connectToRoom } from "../../store/actions/room-action";
import { GetUsers } from "../../store/selectors/room-selectors";
import MoodSetting from "../mood-setting/mood-setting";
import ThemeSelector from "../theme-selector/theme-selector";
import RoomUser from "./room-user/room-user";

import styles from "./room.module.scss";

const Room = () => {
  const dispatch = useDispatch();
  const users = useSelector(GetUsers);

  const { roomId } = useParams();

  useEffect(() => {
    dispatch(connectToRoom(roomId));
  }, [dispatch, roomId]);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Label}>
        <i className={"fas fa-calendar"} />
        {roomId}
      </div>
      <ThemeSelector className={styles.ThemeSelector} />
      <div className={styles.Users}>
        {users.map((user) => (
          <RoomUser key={user.uid} user={user} />
        ))}
      </div>
      <MoodSetting className={styles.MoodSetting} />
    </div>
  );
};

export default Room;
