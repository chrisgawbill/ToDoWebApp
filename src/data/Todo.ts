export class Todo{
    constructor(public name:string, public completed:isCompleted){
        this.name=  name;
        this.completed = completed;
    }
}
export enum isCompleted{
    NotCompleted = 0,
    Completed = 1
}
export var initialToDoData:Todo[] = [
    new Todo("Start on ToDo Appplication", isCompleted.NotCompleted),
    new Todo("Eat Breakfast", isCompleted.Completed)
]