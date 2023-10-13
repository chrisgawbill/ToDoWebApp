import { Button, Col, Collapse, Form, FormGroup, Row } from "react-bootstrap";
import { format } from "ts-date/esm/locale/en";
import {
  EditIcon,
  RevertTagIcon,
  ToDoAddRowIcon,
  ToDoEditPanelCancelIcon,
} from "../assets/icons";
import { Todo, isCompleted, Priority } from "../data/Todo";
import { useEffect, useState } from "react";
import "../styles/components/todo-info-panel.css";
import ToDoAddTagModal from "./todo-add-tag-modal";
import { ToDoTag, defaultTag } from "../data/Tag";
import EditTagModal from "./todo-edit-tag-modal";

interface ToDoInfoPanelProps {
  toDoItem: Todo;
  infoPanelState: boolean;
  setInfoPanelState: Function;
  deletedTag: Function;
  updateToDo: Function;
  addToDo: Function;
  toDoTags: ToDoTag[];
  setToDoTags: Function;
}
export default function ToDoInfoPanel({
  toDoItem,
  infoPanelState,
  setInfoPanelState,
  deletedTag,
  updateToDo,
  addToDo,
  toDoTags,
  setToDoTags,
}: ToDoInfoPanelProps) {
  const [toDoItemName, setToDoItemName] = useState<string>("");
  const [toDoCompleteByDate, setIsToDoCompleteByDate] = useState<Date>(
    new Date()
  );
  const [toDoTag, setToDoTag] = useState<ToDoTag>(defaultTag);
  const [toDoItemStatus, setToDoItemStatus] = useState<isCompleted>(
    isCompleted.Completed
  );
  const [showAddTagModal, setShowAddTagModal] = useState<boolean>(false);
  const [showEditTagModal, setShowEditTagModal] = useState<boolean>(false);
  const [toDoPriority, setToDoPriority] = useState<Priority>(Priority.None);
  useEffect(() => {
    setToDoItemName(toDoItem.name);
    setIsToDoCompleteByDate(toDoItem.completeByDate);
    setToDoItemStatus(toDoItem.completed);
  }, [toDoItem.name, toDoItem.completeByDate, toDoItem.completed]);
  return (
    <div>
      <Collapse in={infoPanelState} dimension={"width"}>
        <div>
          <Form onSubmit={editToDoFormSubmit} id="edit-todo-panel">
            <Col md={1}>
              <Row id="cancel-btn-row">
                <Button
                  title="Close Panel"
                  onClick={() => {
                    setInfoPanelState(false);
                  }}
                >
                  <ToDoEditPanelCancelIcon />
                </Button>
              </Row>
            </Col>
            <Col md={11}>
              <Row className="edit-panel-row">
                <Form.Control
                  type="text"
                  id="todo-name-field"
                  value={toDoItemName}
                  style={{ border: "none", width: "100%" }}
                  onChange={(event) => {
                    setToDoItemName(event.target.value);
                  }}
                />
              </Row>
              <Form.Group className="edit-panel-row">
                <Form.Label>Complete By:</Form.Label>
                <Form.Control
                  type="date"
                  value={formateDateForDatePicker(toDoCompleteByDate)}
                  onChange={saveNewDate}
                />
              </Form.Group>
              <FormGroup className="edit-panel-row">
                <Form.Label>Tag:</Form.Label>
                <Row>
                  <Col md={5}>
                    <Form.Select
                      value={toDoTag.name}
                      onChange={tagOnChangeHandler}
                    >
                      <option value={defaultTag.name}>N/A</option>
                      {iterateTagList()}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-success"
                      title="Add Tag"
                      onClick={addTagClickHandler}
                    >
                      <ToDoAddRowIcon />
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-warning"
                      title="Edit Tags"
                      onClick={editTagClickHandler}
                    >
                      <EditIcon />
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-danger"
                      title="Remove Tag From ToDo"
                      onClick={revertTagClickHandler}
                    >
                      <RevertTagIcon />
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
              <Form.Group className="edit-panel-row">
                <Form.Label>Priority:</Form.Label>
                <Form.Select
                  value={toDoPriority}
                  onChange={priorityOnChangeHandler}
                >
                  <option value={Priority.None}>N/A</option>
                  <option value={Priority.Low}>Low</option>
                  <option value={Priority.Medium}>Medium</option>
                  <option value={Priority.High}>High</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="edit-panel-row">
                <Form.Label>Status:</Form.Label>
                <Form.Select
                  value={toDoItemStatus}
                  onChange={statusOnChangeHandler}
                >
                  <option value={isCompleted.NotCompleted}>
                    Not Completed
                  </option>
                  <option value={isCompleted.Completed}>Completed</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="edit-panel-row">
                <Button
                  variant="outline-success"
                  type="submit"
                  title="Save Changes"
                >
                  Save
                </Button>
              </Form.Group>
            </Col>
          </Form>
        </div>
      </Collapse>
      <ToDoAddTagModal
        showModal={showAddTagModal}
        addTagOnSubmit={addTag}
        setShowAddTagModal={setShowAddTagModal}
      />
      <EditTagModal
        showModal={showEditTagModal}
        setShowModal={setShowEditTagModal}
        setToDoTag={setToDoTag}
        deletedTag={deletedTag}
        tagArray={toDoTags}
        setTagArray={setToDoTags}
      />
    </div>
  );
  /**
   * Formats the date and returns it
   * @param completeByDate
   * @returns
   */
  function formateDateForDatePicker(completeByDate: Date) {
    const formattedDate = format(completeByDate, "YYYY-MM-DD")?.toString();
    // var localBrowserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log(formattedDate);
    return formattedDate;
  }
  /**
   * Saves new date in correct format
   * @param event
   */
  function saveNewDate(event: React.ChangeEvent<HTMLInputElement>) {
    const st: string = event?.target.value.toString();
    const splitDateString: string[] = st.split("-");
    const year: number = parseInt(splitDateString[0]);
    //We subtract a month because in Date January is 0 month
    const month: number = parseInt(splitDateString[1]) - 1;

    const day: number = parseInt(splitDateString[2]);
    const correctedDate = new Date(year, month, day);
    setIsToDoCompleteByDate(correctedDate);
  }
  /**
   * Checks what priority was changed to and sets it in the toDoPriority state
   * @param event
   */
  function priorityOnChangeHandler(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const priorityNum: number = parseInt(event.target.value);
    switch (priorityNum) {
      case 1:
        setToDoPriority(Priority.Low);
        break;
      case 2:
        setToDoPriority(Priority.Medium);
        break;
      case 3:
        setToDoPriority(Priority.High);
        break;
      default:
        setToDoPriority(Priority.None);
        break;
    }
  }
  /**
   * Iterates the array of tags that was passed in
   * @returns <option> that contains the tag name
   */
  function iterateTagList() {
    return toDoTags.map((tag, i) => (
      <option value={tag.name} key={i}>
        {tag.name}
      </option>
    ));
  }
  /**
   * When edit tag button is clicked this function is called to set the state of editTagModal to true
   */
  function editTagClickHandler() {
    setShowEditTagModal(true);
  }
  /**
   * Changes tag from current tag to default tag(N/A)
   */
  function revertTagClickHandler() {
    setToDoTag(defaultTag);
  }
  /**
   * Changes tag to whatever tag was changed to in the <select>
   * @param event 
   */
  function tagOnChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const tagValue = event.target.value;
    if (tagValue === "N/A") {
      setToDoTag(defaultTag);
    } else {
      const tagIndex: number = toDoTags.findIndex(
        (toDoTag) => toDoTag.name === tagValue
      );
      const tag = toDoTags[tagIndex];
      setToDoTag(tag);
    }
  }
  /**
   * If add tag button was clicked then it will set teh addTagModal state to true
   */
  function addTagClickHandler() {
    setShowAddTagModal(true);
  }
  /**
   * adds tag to the tag array
   * @param tag 
   */
  function addTag(tag: ToDoTag) {
    const updatedTagArray: ToDoTag[] = [...toDoTags];
    tag.id = updatedTagArray.length;
    updatedTagArray.push(tag);
    setToDoTags(updatedTagArray);

    if (updatedTagArray.length === 1) {
      setToDoTag(tag);
    }
  }
  /**
   * Changes the status (complete/not complete) of the current ToDo item
   * @param event 
   */
  function statusOnChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    const isCompletedNum: number = parseInt(event.target.value);
    switch (isCompletedNum) {
      case 1:
        setToDoItemStatus(isCompleted.Completed);
        break;
      default:
        setToDoItemStatus(isCompleted.NotCompleted);
        break;
    }
  }
  /**
   * Sends the updated toDo back up to Home (so it can be updated in list) and closes the panel
   * @param e
   */
  function editToDoFormSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const updatedToDo: Todo = {
      id: toDoItem.id,
      name: toDoItemName,
      tag: toDoTag,
      completeByDate: toDoCompleteByDate,
      priority: toDoPriority,
      completed: toDoItemStatus,
    };
    if (updatedToDo.id === -1) {
      addToDo(updatedToDo);
    } else {
      updateToDo(updatedToDo);
    }
    setInfoPanelState(false);
  }
}
