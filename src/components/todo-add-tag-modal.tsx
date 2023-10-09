import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ToDoTag } from "../data/Tag";
interface ToDoAddTagModalProps{
    showModal:boolean,
    addTagOnSubmit:Function,
    setShowAddTagModal:Function
}
export default function ToDoAddTagModal({showModal, addTagOnSubmit, setShowAddTagModal}:ToDoAddTagModalProps){
    const [tagName, setTagName] = useState<string>("")
    const [tagColor, setTagColor] = useState<string>("#000000")
    return(
        <div>
            <Modal show={showModal} onHide={HandleModalClose}>
                <Modal.Header>Add Tag</Modal.Header>
                <Modal.Body>
                    <Form>
                       <Form.Group>
                            <Form.Label>Tag Name: </Form.Label>
                            <Form.Control type="text" onChange={HandleTagNameOnChange}/>
                        </Form.Group> 
                        <Form.Group>
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="color" onChange={HandleTagColorOnChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={HandleModalClose}>Close</Button>
                    <Button variant="outline-success" onClick={HandleTagOnSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    function HandleTagNameOnChange(event: React.ChangeEvent<HTMLInputElement>){
        const tagName:string = event.target.value.toString()
        setTagName(tagName)
    }
    function HandleTagColorOnChange(event: React.ChangeEvent<HTMLInputElement>){
        const tagColor:string = event.target.value.toString()
        setTagColor(tagColor)
    }
    function HandleModalClose(){
        setTagName("")
        setTagColor("")
        setShowAddTagModal(false)
    }
    function HandleTagOnSubmit(){
        const tag:ToDoTag = new ToDoTag(0, tagName, tagColor)
        addTagOnSubmit(tag)
        setShowAddTagModal(false)
    }
}