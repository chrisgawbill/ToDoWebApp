import { ToDoTag } from "./Tag";

export class Todo{
    constructor(public id:number, public name:string, public tag:ToDoTag, public completeByDate:Date, public priority:Priority, public completed:isCompleted){
        this.id = id;
        this.tag = tag;
        this.name=  name;
        this.completeByDate = completeByDate;
        this.priority = priority;
        this.completed = completed;
    }
}
export enum isCompleted{
    NotCompleted = 0,
    Completed = 1
}
export enum Priority{
    None,
    Low,
    Medium,
    High
}
export var initialToDoData:Todo[] = [
    new Todo(0,"Start on ToDo Appplication", new ToDoTag(-1,"",""), new Date(2020,4,23), Priority.None, isCompleted.NotCompleted),
    new Todo(1,"Eat Breakfast", new ToDoTag(-1,"",""), new Date(), Priority.None, isCompleted.Completed)
]