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
  const [infoPanelState, setInfoPanelState] = useState<Boolean>(false);
  const [currentToDoItem, setCurrentToDoItem] = useState<Todo>(
    new Todo(0, "", isCompleted.NotCompleted)
  );
  return (
    <Container>
      <Row>
        <Col md={8}>
          <ToDoHolder
            toDoList={toDoList}
            infoPanelState={infoPanelState}
            setInfoPanelState={setInfoPanelState}
            setCurrentToDoItem={setCurrentToDoItem}
          />
        </Col>
        <Col md={4} style={{ display: ConvertInfoPanelState() }}>
          {AddPanelWithInfo(currentToDoItem, setInfoPanelState, UpdateToDo)}
        </Col>
      </Row>
    </Container>
  );
  /**
   *
   * @param addPanelState
   * @returns display setting for the panel
   */
  function ConvertInfoPanelState() {
    if (infoPanelState === true) {
      return "inline-block";
    }
    return "none";
  }
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
    updatedToDoList[index].completed = updatedToDo.completed;
    setToDoList(updatedToDoList);
  }
}
/**
 *
 * @param toDoItem
 * @returns ToDoInfoPanel Component
 */
function AddPanelWithInfo(
  toDoItem: Todo,
  setInfoPanelState: Function,
  updateToDo: Function
) {
  if (toDoItem.name !== "") {
    return (
      <ToDoInfoPanel
        toDoItem={toDoItem}
        setInfoPanelState={setInfoPanelState}
        updateToDo={updateToDo}
      />
    );
  }
}
