import { Col, Row } from "react-bootstrap";
import { Todo, isCompleted, Priority } from "../data/ToDo";
import "../styles/components/todo-row.css";
import { ToDoAddRowIcon } from "../assets/icons";
import { ToDoTag } from "../data/Tag";
interface ToDoAddRowProps {
  currentToDoSelected: Function;
  rowOnClick: Function;
}
export default function ToDoAddRow({
  currentToDoSelected,
  rowOnClick,
}: ToDoAddRowProps) {
  return (
    <Row className="toDoRow" onClick={addToDoClickHandler}>
      <Col xs={2} lg={2}>
        <ToDoAddRowIcon/>
      </Col>
      <Col xs={4} lg={6}>
        <p>Add To Do</p>
      </Col>
    </Row>
  );
  function addToDoClickHandler() {
    const toDo: Todo = new Todo(
      -1,
      "Add Title",
      new ToDoTag(-1,"",""),
      new Date(),
      Priority.None,
      isCompleted.NotCompleted
    );
    currentToDoSelected(toDo);
    rowOnClick(true);
  }
}
