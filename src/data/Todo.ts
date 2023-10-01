export class Todo{
    constructor(public id:number, public name:string, public completeByDate:Date, public completed:isCompleted){
        this.name=  name;
        this.completeByDate = completeByDate;
        this.completed = completed;
    }
}
export enum isCompleted{
    NotCompleted = 0,
    Completed = 1
}
export var initialToDoData:Todo[] = [
    new Todo(0,"Start on ToDo Appplication", new Date(2020,4,23), isCompleted.NotCompleted),
    new Todo(1,"Eat Breakfast", new Date(), isCompleted.Completed)
]