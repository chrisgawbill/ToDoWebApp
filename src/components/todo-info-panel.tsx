import { Button, Col, Form, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/Todo";
import { useEffect, useState } from "react";

interface ToDoInfoPanelProps {
  toDoItem: Todo,
  setInfoPanelState:Function,
  updateToDo:Function
}
export default function ToDoInfoPanel({ toDoItem, setInfoPanelState, updateToDo }: ToDoInfoPanelProps) {
  const [toDoItemName, setToDoItemName] = useState<string>("");
  const [toDoItemStatus, setToDoItemStatus] = useState<isCompleted>(isCompleted.Completed);
  useEffect(() => {
    setToDoItemName(toDoItem.name)
    setToDoItemStatus(toDoItem.completed)
  },[toDoItem])
  return (
    <Form onSubmit={EditToDoFormSubmit}>
      <Col md={1}>
        <Row>
          <Button onClick={() => {
            setInfoPanelState(false)
          }}>X</Button>
        </Row>
      </Col>
      <Col md={11}>
        <Row>
          <Form.Control
            type="text"
            value={toDoItemName}
            style={{ border: "none", width: "100%" }}
            onChange={(event) => {
              setToDoItemName(event.target.value);
            }}
          />
        </Row>
        <Row>
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
          <Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </Row>
      </Col>
    </Form>
  );
  function EditToDoFormSubmit(e:React.FormEvent<EventTarget>){
      e.preventDefault()
      const toDo:Todo = {id: toDoItem.id, name: toDoItemName, completed: toDoItemStatus }
      updateToDo(toDo)
      setInfoPanelState(false)
  }
}
