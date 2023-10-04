import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
interface ToDoAddTagModalProps{
    showModal:boolean,
    addTagOnSubmit:Function,
    setShowAddTagModal:Function
}
export default function ToDoAddTagModal({showModal, addTagOnSubmit, setShowAddTagModal}:ToDoAddTagModalProps){
    return(
        <div>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header>Add Tag</Modal.Header>
                <Modal.Body>
                    <Form>
                       <Form.Group>
                            <Form.Label>Tag Name: </Form.Label>
                            <Form.Control type="text"/>
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
    function handleModalClose(){
        setShowAddTagModal(false)
    }
    function handleTagOnSubmit(){

    }
}