import { Col, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/Todo";
import { useEffect, useState } from "react";
import { Button } from "bootstrap-react";

import "../styles/components/todo-row.css";

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
      <Col xs={4} lg={2}>
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
        lg={8}
        onClick={() => {
          rowOnClick(true);
          currentToDoSelected(toDoItem);
        }}
      >
        {toDoItem.name}
      </Col>
      <Col xs={4} lg={2}>
        <Button variant="outline-danger" className="todo-delete-btn" onClick={DeleteOnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="red"
            className="bi bi-trash3-fill"
            viewBox="0 0 16 16"
          >
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
          </svg>
        </Button>
      </Col>
    </Row>
  );
  function DeleteOnClick() {
    deleteToDo(toDoItem.id);
  }
}
