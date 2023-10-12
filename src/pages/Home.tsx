import { useState } from "react";
import { Todo, initialToDoData, isCompleted, Priority } from "../data/Todo";
import { Col, Row } from "react-bootstrap";
import ToDoInfoPanel from "../components/todo-info-panel";
import ToDoHolder from "../components/todo-holder";
import { ToDoTag, defaultTag } from "../data/Tag";
/**
 *
 * @returns HomePage with Components loaded
 */
export default function Home() {
  const [toDoList, setToDoList] = useState<Todo[]>(initialToDoData);
  const [infoPanelState, setInfoPanelState] = useState<boolean>(false);
  const [currentToDoItem, setCurrentToDoItem] = useState<Todo>(
    new Todo(0, "", defaultTag, new Date(), Priority.None, isCompleted.NotCompleted)
  );
  const [toDoTags, setToDoTags] = useState<ToDoTag[]>([]);
  return (
    <div>
      <Row>
        <Col md={9}>
          <ToDoHolder
            toDoList={toDoList}
            setInfoPanelState={setInfoPanelState}
            setCurrentToDoItem={setCurrentToDoItem}
            updateToDo={UpdateToDo}
            deleteToDo={DeleteToDo}
          />
        </Col>
        <Col md={3}>{AddPanelWithInfo()}</Col>
      </Row>
    </div>
  );
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
          deletedTag={DeletedTag}
          updateToDo={UpdateToDo}
          addToDo={AddToDo}
          toDoTags={toDoTags}
          setToDoTags={setToDoTags}
        />
      );
    } else {
      return <p></p>;
    }
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
    updatedToDoList[index].completeByDate = updatedToDo.completeByDate;
    updatedToDoList[index].tag = updatedToDo.tag;
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
  function AddToDo(toDoItem: Todo) {
    const updatedToDoList: Todo[] = [...toDoList];
    const index = updatedToDoList.length - 1;
    toDoItem.id = index;
    updatedToDoList.push(toDoItem);

    setToDoList(updatedToDoList);
  }
  function DeletedTag(deletedTagArray:ToDoTag[]){
    const updatedToDoList = [...toDoList]
    for(let i = 0; i < deletedTagArray.length; i++){
      const currentTag = deletedTagArray[i]
      for(var toDo of updatedToDoList){
        if(toDo.tag.id === currentTag.id){
          toDo.tag = defaultTag
        }
      }
      setToDoList(updatedToDoList)
    }
  }
}
