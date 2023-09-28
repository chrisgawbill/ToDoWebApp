import { Button, Col, Form, FormGroup, Image, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/Todo";
import { useEffect, useState } from "react";
import "../styles/components/todo-info-panel.css";

interface ToDoInfoPanelProps {
  toDoItem: Todo;
  setInfoPanelState: Function;
  updateToDo: Function;
}
export default function ToDoInfoPanel({
  toDoItem,
  setInfoPanelState,
  updateToDo,
}: ToDoInfoPanelProps) {
  const [toDoItemName, setToDoItemName] = useState<string>("");
  const [toDoItemStatus, setToDoItemStatus] = useState<isCompleted>(
    isCompleted.Completed
  );
  useEffect(() => {
    setToDoItemName(toDoItem.name);
    setToDoItemStatus(toDoItem.completed);
  }, [toDoItem]);
  return (
    <Form onSubmit={EditToDoFormSubmit}>
      <Col md={1}>
        <Row id="cancel-btn-row">
          <Button
            onClick={() => {
              setInfoPanelState(false);
            }}
          >
            <Image src="C:\Users\gawbi\Documents\Programming\ToDoWebApp\src\assets\icons\icons8-delete.svg" thumbnail/>
          </Button>
        </Row>
      </Col>
      <Col md={11}>
        <Row id="todo-name-row">
          <Form.Control
            type="text"
            id="todo-name-field"
            value={toDoItemName}
            style={{ border: "none", width: "100%" }}
            onChange={(event) => {
              setToDoItemName(event.target.value);
            }}
          />
        </Row>
        <Row id="todo-status-row">
          <Form.Group>
            <Form.Label>Status: </Form.Label>
            <Form.Select
              value={toDoItemStatus}
              onChange={(event) => {
                if (event.target.value === "0") {
                  setToDoItemStatus(isCompleted.NotCompleted);
                } else {
                  setToDoItemStatus(isCompleted.Completed);
                }
              }}
            >
              <option value={isCompleted.NotCompleted}>Not Completed</option>
              <option value={isCompleted.Completed}>Completed</option>
            </Form.Select>
          </Form.Group>
          <Row id="submit-btn-row">
            <FormGroup>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </FormGroup>
          </Row>
        </Row>
      </Col>
    </Form>
  );
  function EditToDoFormSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const toDo: Todo = {
      id: toDoItem.id,
      name: toDoItemName,
      completed: toDoItemStatus,
    };
    updateToDo(toDo);
    setInfoPanelState(false);
  }
}
