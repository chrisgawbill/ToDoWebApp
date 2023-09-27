import { Col, Row } from "react-bootstrap";
import { Todo } from "../data/Todo";
import { useState } from "react";

interface AddToDoPanelProps {
  toDoItem: Todo;
}
export default function AddToDoPanel({ toDoItem }: AddToDoPanelProps) {
  const [toDoItemName, setToDoItemName] = useState<string>(toDoItem.name);
  return (
    <Col>
      <Row>
        <h2>
          <input
            type="text"
            value={toDoItemName}
            style={{ border: "none", width: "100%" }}
          />
        </h2>
      </Row>
      <Row>
        <p>Status: </p>
        {ConvertStatusBool(toDoItem.completed)}
      </Row>
    </Col>
  );
}
function ConvertStatusBool(toDoItemStatus: Boolean) {
  if (toDoItemStatus === true) {
    return "Completed";
  }
  return "Not Completed";
}
