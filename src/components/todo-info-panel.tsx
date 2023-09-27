import { Button, Col, Form, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/Todo";
import { useState } from "react";

interface ToDoInfoPanelProps {
  toDoItem: Todo;
}
export default function ToDoInfoPanel({ toDoItem }: ToDoInfoPanelProps) {
  const [toDoItemName, setToDoItemName] = useState<string>(toDoItem.name);
  const [toDoItemStatus, setToDoItemStatus] = useState<isCompleted>(
    toDoItem.completed
  );
  return (
    <Form>
      <Col>
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
}
