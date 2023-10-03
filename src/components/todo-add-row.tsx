import { Col, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/Todo";
interface ToDoAddRowProps {
  currentToDoSelected: Function;
  rowOnClick: Function;
}
export default function ToDoAddRow({
  currentToDoSelected,
  rowOnClick,
}: ToDoAddRowProps) {
  return (
    <Row>
      <Col xs={2} lg={2}></Col>
      <Col xs={4} lg={6} onClick={AddToDoClickHandler}>
        <p>Add To Do</p>
      </Col>
    </Row>
  );
  function AddToDoClickHandler() {
    const toDo: Todo = new Todo(
      -1,
      "Add Title",
      new Date(),
      isCompleted.NotCompleted
    );
    currentToDoSelected(toDo);
    rowOnClick(true);
  }
}
