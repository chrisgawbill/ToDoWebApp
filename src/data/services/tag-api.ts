import { axiosInstance } from "./axios";
export function GetAllToDos(){
    return axiosInstance.get("/ToDo").then((response) => {
        console.log(response)
    });
}