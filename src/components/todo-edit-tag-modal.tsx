import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { ToDoTag, defaultTag } from "../data/Tag";
import { useEffect, useState } from "react";
import { ToDoRowDeleteIcon } from "../assets/icons";
import EditTagModalRow from "./todo-edit-tag-modal-row";

interface EditTagModalProps {
  showModal: boolean;
  setShowModal: Function;
  setToDoTag: Function;
  tagArray: ToDoTag[];
  setTagArray: Function;
}
export default function EditTagModal({
  showModal,
  setShowModal,
  setToDoTag,
  tagArray,
  setTagArray,
}: EditTagModalProps) {
  const [localTagArray, setLocalTagArray] = useState<ToDoTag[]>([]);
  useEffect(() => {
    setLocalTagArray(tagArray);
  }, [tagArray]);
  return (
    <Modal show={showModal} onHide={HideModalHandler}>
      <Modal.Header>Edit Tags</Modal.Header>
      <Modal.Body>{IterateTagList()}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={SaveTagsClickHandler}>
          Save
        </Button>
        <Button variant="outline-danger" onClick={HideModalHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
  function IterateTagList() {
    return localTagArray.map((tag, i) => (
      <EditTagModalRow
        tag={tag}
        index={i}
        tagArray={localTagArray}
        setTagArray={setLocalTagArray}
      />
    ));
  }
  function HideModalHandler() {
    setLocalTagArray(tagArray);
    setShowModal(false);
  }
  function SaveTagsClickHandler() {
    setTagArray([...localTagArray]);
    if (tagArray.length !== localTagArray.length) {
      setToDoTag(defaultTag);
    }
    setShowModal(false);
  }
}
