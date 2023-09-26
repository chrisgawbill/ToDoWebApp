import { useState } from "react";
import { Todo } from "../data/Todo";
import ToDoRow from "../components/todo-row";
export default function Home() {
  const [toDoList, setToDoList] = useState<Todo[]>([]);
  return <div>{IterateToDoList(toDoList)}</div>;
}
function IterateToDoList(toDoList: Todo[]) {
  if (toDoList.length === 0) {
    return <p>"There are no ToDo's!"</p>;
  }
  toDoList.map(function (toDoItem, i) {
    return <ToDoRow name={toDoItem.name}></ToDoRow>;
  });
}
