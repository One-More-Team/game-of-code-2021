import React from "react";

import { DialogId } from "./dialog";
import Profile from "./types/profile/profile";

export const getDialog = ({ dialogId, close }) => {
  switch (dialogId) {
    case DialogId.PROFILE:
      return {
        isCloseable: true,
        label: "your-profile",
        component: <Profile close={close} />,
      };

    default:
      return <div />;
  }
};
