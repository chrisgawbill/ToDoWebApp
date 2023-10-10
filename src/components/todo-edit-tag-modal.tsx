import { Button, Modal } from "react-bootstrap";
import { ToDoTag } from "../data/Tag";

interface EditTagModalProps {
  showModal: boolean;
  setShowModal: Function;
  tagArray: ToDoTag[];
  setTagArray: Function;
}
export default function EditTagModal({
  showModal,
  setShowModal,
  tagArray,
  setTagArray
}: EditTagModalProps) {
  return (
    <Modal show={showModal} onHide={HideModalHandler}>
        <Modal.Header>Edit Tags</Modal.Header>
        <Modal.Footer>
            <Button variant="outline-success" onClick={SaveTagsClickHandler}>Save</Button>
            <Button variant="outline-danger" onClick={HideModalHandler}>Close</Button>
        </Modal.Footer>
    </Modal>
  );
  function HideModalHandler(){
    setShowModal(false)
  }
  function SaveTagsClickHandler(){
    setShowModal(false)
  }
}
