import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog } from "../../../store/actions/dialog-action";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import {
  GetFinishedActions,
  GetNegativeActions,
  GetPositiveActions,
} from "../../../store/selectors/room-selectors";
import Button, { ButtonStyle } from "../../../ui/button/button";
import { DialogId } from "../../dialog/dialog";
import RoomAction from "./room-action/room-action";

import styles from "./room-actions.module.scss";
import {
  setActionOrder,
  setActionTypes,
} from "../../../store/actions/room-action";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const getItemStyle = (_, draggableStyle) => ({
  ...draggableStyle,
});

const RoomActions = ({ className }) => {
  const dispatch = useDispatch();
  const negativeActions = useSelector(GetNegativeActions);
  const positiveActions = useSelector(GetPositiveActions);
  const finishedActions = useSelector(GetFinishedActions);

  const addActionRequest = () =>
    dispatch(openDialog(DialogId.CREATE_ROOM_ACTION));

  const setActionOrderRequest = (list) => dispatch(setActionOrder(list));
  const setActionTypesRequest = (list) => dispatch(setActionTypes(list));

  const id2List = {
    negative: negativeActions,
    positive: positiveActions,
    finished: finishedActions,
  };

  const getList = (id) => id2List[id];

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    console.log(source, destination);
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      setActionOrderRequest(items);
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      setActionTypesRequest(result);
    }
  };

  return (
    <div className={`${styles.Wrapper} ${className}`}>
      <Button
        messageId="create-new-action"
        icon="fa-plus"
        onClick={addActionRequest}
        style={ButtonStyle.Primary}
        className={styles.Add}
      />
      <div className={styles.Blocks}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="negative">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`${styles.Block} ${
                  snapshot.isDraggingOver && styles.DragTarget
                }`}
              >
                {negativeActions.map((item, index) => (
                  <Draggable
                    key={String(item.timestamp)}
                    draggableId={String(item.timestamp)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={styles.Block}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <RoomAction action={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="positive">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`${styles.Block} ${
                  snapshot.isDraggingOver && styles.DragTarget
                }`}
              >
                {positiveActions.map((item, index) => (
                  <Draggable
                    key={String(item.timestamp)}
                    draggableId={String(item.timestamp)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <RoomAction action={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="finished">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`${styles.Block} ${
                  snapshot.isDraggingOver && styles.DragTarget
                }  ${styles.Finished}`}
              >
                {finishedActions.map((item, index) => (
                  <Draggable
                    key={String(item.timestamp)}
                    draggableId={String(item.timestamp)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <RoomAction action={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default RoomActions;
