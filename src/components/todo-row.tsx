import { Col, Row } from "react-bootstrap";
import "../styles/components/todo-row.css";
import { Todo, isCompleted } from "../data/Todo";
import { useEffect, useState } from "react";
interface ToDoRowProps {
  toDoItem: Todo,
  rowState: Boolean,
  rowOnClick: Function,
  currentToDoSelected: Function,
  updateToDo:Function,
  deleteToDo:Function
}
export default function ToDoRow({
  toDoItem,
  rowState,
  rowOnClick,
  currentToDoSelected,
  updateToDo,
  deleteToDo
}: ToDoRowProps) {
  const [isToDoCompleted, setIsToDoCompleted] = useState<boolean>(false)
  useEffect(() => {
    if(toDoItem.completed === isCompleted.Completed){
      setIsToDoCompleted(true)
    }else{
      setIsToDoCompleted(false)
    }
  },[toDoItem.completed])
  return (
    <Row
      className="toDoRow"
      onClick={() => {
        rowOnClick(true);
        currentToDoSelected(toDoItem);
      }}
    >
      <Col xs={6} lg={2}>
        <input
          type="checkbox"
          checked = {isToDoCompleted}
          onClick={() => {
            if (toDoItem.completed === 0) {
              toDoItem.completed = isCompleted.Completed
            } else {
              toDoItem.completed = isCompleted.NotCompleted
            }
            updateToDo(toDoItem)
          }}
        ></input>
      </Col>
      <Col xs={6} lg={10}>
        {toDoItem.name}
      </Col>
    </Row>
  );
}
