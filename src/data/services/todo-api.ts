import { axiosInstance } from "./axios";
import { ToDo } from "../ToDo";
export function GetAllToDos(){
    return axiosInstance.get("/ToDo").then((response) => {
        console.log(response)
    });
}
export function CreateToDo(toDoItem:ToDo){
    return axiosInstance.post("/ToDo",[toDoItem]).then((response) => {
        console.log(response)
    });
}