import React from "react";
import { useDispatch } from "react-redux";

import Button, { ButtonStyle } from "../../../../ui/button/button";
import SimpleDialog from "../simple-dialog/simple-dialog";
import { FormattedMessage } from "react-intl";

import { leaveRoom } from "../../../../store/actions/room-action";

const LeaveRoom = ({ close }) => {
  const dispatch = useDispatch();
  const leaveRoomRequest = () => {
    close();
    dispatch(leaveRoom());
  };

  const content = <FormattedMessage id="leave-room-question" />;

  const actions = (
    <>
      <Button
        messageId="leave"
        style={ButtonStyle.Primary}
        onClick={leaveRoomRequest}
        navigationTarget="/home"
      />
      <Button
        messageId="cancel"
        style={ButtonStyle.Secondary}
        onClick={close}
      />
    </>
  );

  return <SimpleDialog content={content} actions={actions} />;
};

export default LeaveRoom;
