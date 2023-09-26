export class Todo{
    constructor(public name:string, public completed:boolean){
        this.name=  name;
        this.completed = completed;
    }
}
export var initialToDoData:Todo[] = [
    new Todo("Start on ToDo Appplication", false),
    new Todo("Eat Breakfast", false)
]