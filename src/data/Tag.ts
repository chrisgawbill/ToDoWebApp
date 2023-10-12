export class ToDoTag{
    constructor(public id:number, public name:string, public color:string){
        this.id = id;
        this.name = name;
        this.color = color;
    }
}
export const defaultTag = new ToDoTag(-1, "N/A", "#000000");