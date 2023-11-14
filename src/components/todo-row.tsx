import { Badge, Col, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/ToDo";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "../styles/components/todo-row.css";
import { ToDoRowDeleteIcon } from "../assets/icons";

interface ToDoRowProps {
  toDoItem: Todo;
  rowOnClick: Function;
  currentToDoSelected: Function;
  updateToDo: Function;
  deleteToDo: Function;
}
export default function ToDoRow({
  toDoItem,
  rowOnClick,
  currentToDoSelected,
  updateToDo,
  deleteToDo,
}: ToDoRowProps) {
  const [isToDoCompleted, setIsToDoCompleted] = useState<boolean>(false);
  useEffect(() => {
    if (toDoItem.completed === isCompleted.Completed) {
      setIsToDoCompleted(true);
    } else {
      setIsToDoCompleted(false);
    }
  }, [toDoItem.completed]);
  return (
    <Row className="toDoRow">
      <Col xs={1} lg={1}>
        <input
          type="checkbox"
          checked={isToDoCompleted}
          onClick={() => {
            if (toDoItem.completed === 0) {
              toDoItem.completed = isCompleted.Completed;
            } else {
              toDoItem.completed = isCompleted.NotCompleted;
            }
            updateToDo(toDoItem);
          }}
        ></input>
      </Col>
      <Col xs={4} lg={5} onClick={rowOnClickBasicHandler}>
        {toDoItem.name}
      </Col>
      <Col xs={2} lg={1}>
          {rowPriorityDisplayHandler()}
      </Col>
      <Col xs={2} lg={1}>{rowTagDisplayHandler()}</Col>
      <Col xs={2} lg={2} onClick={rowOnClickBasicHandler}>
        {toDoItem.completeByDate.toLocaleDateString()}
      </Col>
      <Col xs={1} lg={2}>
        <Button variant="outline-danger" size="sm" title="Delete ToDo" onClick={deleteOnClick}>
          <ToDoRowDeleteIcon />
        </Button>
      </Col>
    </Row>
  );
  /**
   * Handles the delete icon onClick event. Deletes row and closes panel
   */
  function deleteOnClick() {
    deleteToDo(toDoItem.id);
    rowOnClick(false);
  }
  /**
   * Handles a basic on click
   */
  function rowOnClickBasicHandler() {
    rowOnClick(true);
    currentToDoSelected(toDoItem);
  }
  function rowTagDisplayHandler(){
    const tag = toDoItem.tag
    if(tag.name === "N/A"){
      return <></>
    }
    return <Badge pill bg="light" style={{color:toDoItem.tag.color}}>{toDoItem.tag.name}</Badge>
  }
  function rowPriorityDisplayHandler(){
    const priority = toDoItem.priority
    switch(priority){
      case 1:
        return <Badge pill bg="secondary">Low</Badge>
      case 2:
        return <Badge pill bg="warning">Medium</Badge>
      case 3:
        return <Badge pill bg="danger">High</Badge>
      default:
        return <></>
    }
  }
}
