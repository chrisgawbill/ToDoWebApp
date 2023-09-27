import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/Todo";
import ToDoRow from "./todo-row";

interface ToDoHolderProps {
  toDoList: Todo[];
  infoPanelState: Boolean;
  setInfoPanelState: Function;
  setCurrentToDoItem: Function;
}
/**
 *
 * @param ToDoHolderProps
 * @returns A container holding not completed ToDos and completed ToDos
 */
export default function ToDoHolder({
  toDoList,
  infoPanelState,
  setInfoPanelState,
  setCurrentToDoItem,
}: ToDoHolderProps) {
    const [completedToDos, setCompletedToDos] = useState<Todo[]>([])
    const [uncompletedToDos, setUncompletedToDos] = useState<Todo[]>([])
    useEffect(() => {
        setCompletedToDos(FilterToDoList(toDoList, isCompleted.Completed))
        setUncompletedToDos(FilterToDoList(toDoList, isCompleted.NotCompleted))
    },[toDoList])
  return (
    <Container>
      <Container id="notCompletedToDos">
        <Row>
          <h2>Tasks To Do</h2>
        </Row>
        <Row>
          {IterateToDoList(
            uncompletedToDos,
            infoPanelState,
            setInfoPanelState,
            setCurrentToDoItem
          )}
        </Row>
      </Container>
      <Container id="completedToDos">
        <Row>
            <h2>Completed Tasks</h2>
        </Row>
        <Row>
        {IterateToDoList(
            completedToDos,
            infoPanelState,
            setInfoPanelState,
            setCurrentToDoItem
          )}
        </Row>
      </Container>
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
function IterateToDoList(
  toDoList: Todo[],
  panelState: Boolean,
  changeAddPanelState: Function,
  setCurrentToDoItem: Function
) {
  if (toDoList.length === 0) {
    return <p>"There are no ToDo's!"</p>;
  }
  return toDoList.map((toDoItem, i) => (
    <ToDoRow
      toDoItem={toDoItem}
      rowState={panelState}
      rowOnClick={changeAddPanelState}
      currentToDoSelected={setCurrentToDoItem}
      key={i}
    ></ToDoRow>
  ));
}
function FilterToDoList(toDoList:Todo[], filterBy:isCompleted){
    const filteredList = toDoList.filter((toDo) => toDo.completed === filterBy)
    return filteredList
}
