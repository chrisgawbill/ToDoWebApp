import { Col, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/Todo";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
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
      <Col xs={2} lg={2}>
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
      <Col
        xs={4}
        lg={6}
        onClick={() => {
          rowOnClick(true);
          currentToDoSelected(toDoItem);
        }}
      >
        {toDoItem.name}
      </Col>
      <Col xs={2} lg={2}>
        {toDoItem.completeByDate.toLocaleDateString()}
      </Col>
      <Col xs={4} lg={2}>
        <Button variant="outline-danger" size="sm" onClick={DeleteOnClick}>
            <ToDoRowDeleteIcon/>
        </Button>
      </Col>
    </Row>
  );
  /**
   * Handles the delete icon onClick event. Deletes row and closes panel
   */
  function DeleteOnClick() {
    deleteToDo(toDoItem.id);
    rowOnClick(false)
  }
}
