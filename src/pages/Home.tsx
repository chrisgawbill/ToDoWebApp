import { useState } from "react";
import { Todo, initialToDoData } from "../data/Todo";
import ToDoRow from "../components/todo-row";
import { Col, Container, Row } from "react-bootstrap";
import AddToDoPanel from "../components/add-todo-panel";
export default function Home() {
  const [toDoList, setToDoList] = useState<Todo[]>(initialToDoData);
  const [addPanelState, setAddPanelState] = useState<Boolean>(false)
  return (
    <Container>
      <Row>
        <Col md={8}>{IterateToDoList(toDoList, addPanelState, setAddPanelState)}</Col>
        <Col md={4} style={{display:ConvertAddPanelState(addPanelState)}}><AddToDoPanel name="TEST" status={false} /></Col>
      </Row>
    </Container>
  );
}
function IterateToDoList(toDoList: Todo[], panelState:Boolean, changeAddPanelState:Function) {
  if (toDoList.length === 0) {
    return <p>"There are no ToDo's!"</p>;
  }
  return toDoList.map((toDoItem, i) => (
    <ToDoRow name={toDoItem.name} rowState={panelState} rowOnClick={changeAddPanelState} key={i}></ToDoRow>
  ));
}
function ConvertAddPanelState(addPanelState:Boolean){
  console.log(addPanelState)
  if(addPanelState === true){
    return "inline-block"
  }
  return "none"
}
