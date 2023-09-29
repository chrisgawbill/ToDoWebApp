export class Todo{
    constructor(public id:number, public name:string, public completed:isCompleted){
        this.name=  name;
        this.completed = completed;
    }
}
export enum isCompleted{
    NotCompleted = 0,
    Completed = 1
}
export var initialToDoData:Todo[] = [
    new Todo(0,"Start on ToDo Appplication", isCompleted.NotCompleted),
    new Todo(1,"Eat Breakfast", isCompleted.Completed)
]