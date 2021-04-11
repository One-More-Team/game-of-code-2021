import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { openDialog } from "../../store/actions/dialog-action";

import { connectToRoom } from "../../store/actions/room-action";
import { GetUsers } from "../../store/selectors/room-selectors";
import Button, { ButtonStyle } from "../../ui/button/button";
import { DialogId } from "../dialog/dialog";
import MoodSetting from "../mood-setting/mood-setting";
import ThemeSelector from "../theme-selector/theme-selector";
import RoomActions from "./room-actions/room-actions";
import RoomUser from "./room-user/room-user";

import styles from "./room.module.scss";

const Room = () => {
  const dispatch = useDispatch();
  const users = useSelector(GetUsers);

  const { roomId } = useParams();

  const leaveRoomRequest = () => dispatch(openDialog(DialogId.LEAVE_ROOM));

  useEffect(() => {
    dispatch(connectToRoom(roomId));
  }, [dispatch, roomId]);

  return (
    <div className={styles.Wrapper}>
      <Button
        icon="fa-times"
        onClick={leaveRoomRequest}
        style={ButtonStyle.Quaternary}
        className={styles.CloseButton}
      />
      <div className={styles.Label}>
        <i className={"fas fa-calendar"} />
        {roomId}
      </div>
      <ThemeSelector className={styles.ThemeSelector} />
      <RoomActions className={styles.Content} />
      <div className={styles.Users}>
        {users && users.map((user) => <RoomUser key={user.uid} user={user} />)}
      </div>
      <MoodSetting className={styles.MoodSetting} />
    </div>
  );
};

export default Room;
