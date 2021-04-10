import React from "react";

import { DialogId } from "./dialog";
import LeaveRoom from "./types/leave-room/leave-room";
import Profile from "./types/profile/profile";

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

    default:
      return <div />;
  }
};
