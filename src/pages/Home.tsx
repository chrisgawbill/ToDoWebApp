import { useState } from "react";
import { Todo, initialToDoData, isCompleted } from "../data/Todo";
import { Col, Container, Row } from "react-bootstrap";
import ToDoInfoPanel from "../components/todo-info-panel";
import ToDoHolder from "../components/todo-holder";
/**
 *
 * @returns HomePage with Components loaded
 */
export default function Home() {
  const [toDoList, setToDoList] = useState<Todo[]>(initialToDoData);
  const [infoPanelState, setInfoPanelState] = useState<boolean>(false);
  const [currentToDoItem, setCurrentToDoItem] = useState<Todo>(
    new Todo(0, "", new Date(), isCompleted.NotCompleted)
  );
  return (
    <Container>
      <Row>
        <Col md={8}>
          <ToDoHolder
            toDoList={toDoList}
            setInfoPanelState={setInfoPanelState}
            setCurrentToDoItem={setCurrentToDoItem}
            updateToDo={UpdateToDo}
            deleteToDo={DeleteToDo}
          />
        </Col>
        <Col md={4}>{AddPanelWithInfo()}</Col>
      </Row>
    </Container>
  );
  /**
   *
   * @param updatedToDo
   */
  function UpdateToDo(updatedToDo: Todo) {
    const updatedToDoList: Todo[] = [...toDoList];
    const index = updatedToDoList.findIndex(
      (toDo) => toDo.id === updatedToDo.id
    );
    updatedToDoList[index].name = updatedToDo.name;
    updatedToDoList[index].completeByDate = updatedToDo.completeByDate;
    updatedToDoList[index].completed = updatedToDo.completed;
    setToDoList(updatedToDoList);
  }
  function DeleteToDo(deleteToDoId: number) {
    let updatedToDoList = [...toDoList];
    updatedToDoList = updatedToDoList.filter(
      (toDo) => toDo.id !== deleteToDoId
    );
    setToDoList(updatedToDoList);
  }
  /**
   *
   * @param toDoItem
   * @returns ToDoInfoPanel Component
   */
  function AddPanelWithInfo() {
    if (currentToDoItem.name !== "") {
      console.log(infoPanelState);
      return (
        <ToDoInfoPanel
          toDoItem={currentToDoItem}
          infoPanelState={infoPanelState}
          setInfoPanelState={setInfoPanelState}
          updateToDo={UpdateToDo}
        />
      );
    } else {
      return <p></p>;
    }
  }
}
