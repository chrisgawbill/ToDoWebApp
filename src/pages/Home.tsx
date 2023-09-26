import { useState } from "react";
import { Todo, initialToDoData } from "../data/Todo";
import ToDoRow from "../components/todo-row";
export default function Home() {
  const [toDoList, setToDoList] = useState<Todo[]>(initialToDoData);
  return(<div>{IterateToDoList(toDoList)}</div>);
}
function IterateToDoList(toDoList: Todo[]) {
  if (toDoList.length === 0) {
    return <p>"There are no ToDo's!"</p>;
  }
  return toDoList.map((toDoItem, i) => (
    <ToDoRow name={toDoItem.name} key={i}></ToDoRow>
  ));
}
