import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Todo, isCompleted } from "../data/Todo";
import ToDoRow from "./todo-row";
import ToDoAddRow from "./todo-add-row";

interface ToDoHolderProps {
  toDoList: Todo[];
  setInfoPanelState: Function;
  setCurrentToDoItem: Function;
  updateToDo: Function;
  deleteToDo: Function;
}
/**
 *
 * @param ToDoHolderProps
 * @returns A container holding not completed ToDos and completed ToDos
 */
export default function ToDoHolder({
  toDoList,
  setInfoPanelState,
  setCurrentToDoItem,
  updateToDo,
  deleteToDo,
}: ToDoHolderProps) {
  const [completedToDos, setCompletedToDos] = useState<Todo[]>([]);
  const [uncompletedToDos, setUncompletedToDos] = useState<Todo[]>([]);
  useEffect(() => {
    setCompletedToDos(FilterToDoList(toDoList, isCompleted.Completed));
    setUncompletedToDos(FilterToDoList(toDoList, isCompleted.NotCompleted));
  }, [toDoList]);
  return (
    <div>
      <div id="notCompletedToDos">
        <Row>
          <h2>Tasks To Do</h2>
        </Row>
        <Row>
          {IterateToDoList(
            uncompletedToDos,
            setInfoPanelState,
            setCurrentToDoItem,
            updateToDo,
            deleteToDo
          )}
        </Row>
        <Row>
          <ToDoAddRow
            currentToDoSelected={setCurrentToDoItem}
            rowOnClick={setInfoPanelState}
          />
        </Row>
      </div>
      <div id="completedToDos">
        <Row>
          <h2>Completed Tasks</h2>
        </Row>
        <Row>
          {IterateToDoList(
            completedToDos,
            setInfoPanelState,
            setCurrentToDoItem,
            updateToDo,
            deleteToDo
          )}
        </Row>
      </div>
    </div>
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
  changeAddPanelState: Function,
  setCurrentToDoItem: Function,
  updateToDo: Function,
  deleteToDo: Function
) {
  if (toDoList.length === 0) {
    return <p>"There are no ToDo's!"</p>;
  }
  return toDoList.map((toDoItem, i) => (
    <ToDoRow
      toDoItem={toDoItem}
      rowOnClick={changeAddPanelState}
      currentToDoSelected={setCurrentToDoItem}
      updateToDo={updateToDo}
      deleteToDo={deleteToDo}
      key={i}
    ></ToDoRow>
  ));
}
function FilterToDoList(toDoList: Todo[], filterBy: isCompleted) {
  const filteredList = toDoList.filter((toDo) => toDo.completed === filterBy);
  return filteredList;
}
