import { useState } from "react";
import { Todo, initialToDoData } from "../data/Todo";
import ToDoRow from "../components/todo-row";
import { Col, Container, Row } from "react-bootstrap";
import AddToDoPanel from "../components/add-todo-panel";
/**
 * 
 * @returns HomePage with Components loaded
 */
export default function Home() {
  const [toDoList, setToDoList] = useState<Todo[]>(initialToDoData);
  const [addPanelState, setAddPanelState] = useState<Boolean>(false)
  const [currentToDoItem, setCurrentToDoItem] = useState<Todo>(new Todo("",false))
  return (
    <Container>
      <Row>
        <Col md={8}>{IterateToDoList(toDoList, addPanelState, setAddPanelState, setCurrentToDoItem)}</Col>
        <Col md={4} style={{display:ConvertAddPanelState(addPanelState)}}>{AddPanelWithInfo(currentToDoItem)}</Col>
      </Row>
    </Container>
  );
}
/**
 * 
 * @param toDoList 
 * @param panelState 
 * @param changeAddPanelState 
 * @param setCurrentToDoItem 
 * @returns ToDoRow Component
 */
function IterateToDoList(toDoList: Todo[], panelState:Boolean, changeAddPanelState:Function, setCurrentToDoItem:Function) {
  if (toDoList.length === 0) {
    return <p>"There are no ToDo's!"</p>;
  }
  return toDoList.map((toDoItem, i) => (
    <ToDoRow toDoItem={toDoItem} rowState={panelState} rowOnClick={changeAddPanelState} currentToDoSelected={setCurrentToDoItem}  key={i}></ToDoRow>
  ));
}
/**
 * 
 * @param addPanelState 
 * @returns display setting for the panel
 */
function ConvertAddPanelState(addPanelState:Boolean){
  console.log(addPanelState)
  if(addPanelState === true){
    return "inline-block"
  }
  return "none"
}
/**
 * 
 * @param toDoItem 
 * @returns AddToDoPanel Component
 */
function AddPanelWithInfo(toDoItem:Todo){
  if(toDoItem.name != ""){
    return <AddToDoPanel toDoItem = {toDoItem}/>
  }
}
