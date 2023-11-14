import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ToDoTag } from "../data/ToDoTag";
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
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header>Add Tag</Modal.Header>
                <Modal.Body>
                    <Form>
                       <Form.Group>
                            <Form.Label>Tag Name: </Form.Label>
                            <Form.Control type="text" onChange={handleTagNameOnChange}/>
                        </Form.Group> 
                        <Form.Group>
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="color" onChange={handleTagColorOnChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleModalClose}>Close</Button>
                    <Button variant="outline-success" onClick={handleTagOnSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
    function handleTagNameOnChange(event: React.ChangeEvent<HTMLInputElement>){
        const tagName:string = event.target.value.toString()
        setTagName(tagName)
    }
    function handleTagColorOnChange(event: React.ChangeEvent<HTMLInputElement>){
        const tagColor:string = event.target.value.toString()
        setTagColor(tagColor)
    }
    function handleModalClose(){
        setTagName("")
        setTagColor("")
        setShowAddTagModal(false)
    }
    function handleTagOnSubmit(){
        const tag:ToDoTag = new ToDoTag(0, tagName, tagColor)
        addTagOnSubmit(tag)
        setShowAddTagModal(false)
    }
}