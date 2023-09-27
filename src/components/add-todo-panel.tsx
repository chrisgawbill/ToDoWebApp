import { Col, Row } from "react-bootstrap"
import { Todo } from "../data/Todo"

interface AddToDoPanelProps{
    toDoItem:Todo
}
export default function AddToDoPanel({toDoItem}: AddToDoPanelProps){
 return(
    <Col>
        <Row>
           <h2>{toDoItem.name}</h2> 
        </Row>
        <Row>
            <p>Status: </p>{ConvertStatusBool(toDoItem.completed)}
        </Row>
    </Col>
 )   
}
function ConvertStatusBool(toDoItemStatus:Boolean){
    if(toDoItemStatus === true){
        return "Completed"
    }
    return "Not Completed"
}