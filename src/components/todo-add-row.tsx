import { Col, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/Todo";
import "../styles/components/todo-row.css";
import { ToDoAddRowIcon } from "../assets/icons";
interface ToDoAddRowProps {
  currentToDoSelected: Function;
  rowOnClick: Function;
}
export default function ToDoAddRow({
  currentToDoSelected,
  rowOnClick,
}: ToDoAddRowProps) {
  return (
    <Row className="toDoRow" onClick={AddToDoClickHandler}>
      <Col xs={2} lg={2}>
        <ToDoAddRowIcon/>
      </Col>
      <Col xs={4} lg={6}>
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
