import { Button, Modal} from "react-bootstrap";
import { ToDoTag, defaultTag } from "../data/Tag";
import { useEffect, useState } from "react";
import EditTagModalRow from "./todo-edit-tag-modal-row";

interface EditTagModalProps {
  showModal: boolean;
  setShowModal: Function;
  setToDoTag: Function;
  deletedTag:Function;
  tagArray: ToDoTag[];
  setTagArray: Function;
}
export default function EditTagModal({
  showModal,
  setShowModal,
  setToDoTag,
  deletedTag,
  tagArray,
  setTagArray,
}: EditTagModalProps) {
  const [localTagArray, setLocalTagArray] = useState<ToDoTag[]>([]);
  const [deletedTagArray, setDeletedTagArray] = useState<ToDoTag[]>([]);
  useEffect(() => {
    setLocalTagArray(tagArray);
  }, [tagArray]);
  return (
    <Modal show={showModal} onHide={hideModalHandler}>
      <Modal.Header>Edit Tags</Modal.Header>
      <Modal.Body>{iterateTagList()}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={saveTagsClickHandler}>
          Save
        </Button>
        <Button variant="outline-danger" onClick={hideModalHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
  function iterateTagList() {
    return localTagArray.map((tag, i) => (
      <EditTagModalRow
        tag={tag}
        index={i}
        tagArray={localTagArray}
        setTagArray={setLocalTagArray}
        setDeletedTagArray={deleteTagHandler}
      />
    ));
  }
  function hideModalHandler() {
    setLocalTagArray(tagArray);
    setShowModal(false);
  }
  function saveTagsClickHandler() {
    setTagArray([...localTagArray]);
    if(localTagArray.length !== tagArray.length){
      setToDoTag(defaultTag)
      deletedTag(deletedTagArray)
    }
    setShowModal(false);
  }
  function deleteTagHandler(tag:ToDoTag){
    const updatedDeletedTagArray = [...deletedTagArray]
    updatedDeletedTagArray.push(tag)
    setDeletedTagArray(updatedDeletedTagArray)
  }
}
