import { Col, Row } from "react-bootstrap"

interface AddToDoPanelProps{
    name:string,
    status:Boolean
}
export default function AddToDoPanel({name, status}: AddToDoPanelProps){
 return(
    <Col>
        <Row>
           <h2>{name}</h2> 
        </Row>
        <Row>
            <p>Status: </p>{ConvertStatusBool(status)}
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