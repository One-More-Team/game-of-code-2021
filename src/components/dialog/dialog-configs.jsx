import React from "react";

import { DialogId } from "./dialog";
import CreateRoomAction from "./types/create-room-action/create-room-action";
import LeaveRoom from "./types/leave-room/leave-room";
import Profile from "./types/profile/profile";
import StartStream from "./types/start-stream/start-stream";

export const getDialog = ({ dialogId, close }) => {
  switch (dialogId) {
    case DialogId.PROFILE:
      return {
        isCloseable: true,
        label: "your-profile",
        component: <Profile close={close} />,
      };

    case DialogId.LEAVE_ROOM:
      return {
        isCloseable: true,
        label: "leave-room-title",
        component: <LeaveRoom close={close} />,
      };

    case DialogId.START_STREAM:
      return {
        isCloseable: true,
        label: "start-stream-title",
        component: <StartStream close={close} />,
      };

    case DialogId.CREATE_ROOM_ACTION:
      return {
        isCloseable: true,
        label: "create-room-action",
        component: <CreateRoomAction close={close} />,
      };

    default:
      return <div />;
  }
};
