import { Button, Col, Collapse, Form, FormGroup, Row } from "react-bootstrap";
import { format } from "ts-date/esm/locale/en";
import {
  ToDoAddRowIcon,
  ToDoEditPanelCancelIcon,
  ToDoRowDeleteIcon,
} from "../assets/icons";
import { Todo, isCompleted } from "../data/Todo";
import { useEffect, useState } from "react";
import "../styles/components/todo-info-panel.css";
import ToDoAddTagModal from "./todo-add-tag-modal";
import { ToDoTag } from "../data/Tag";

interface ToDoInfoPanelProps {
  toDoItem: Todo;
  infoPanelState: boolean;
  setInfoPanelState: Function;
  updateToDo: Function;
  addToDo: Function;
}
export default function ToDoInfoPanel({
  toDoItem,
  infoPanelState,
  setInfoPanelState,
  updateToDo,
  addToDo,
}: ToDoInfoPanelProps) {
  const defaultTag = new ToDoTag(-1, "N/A", "#000000");
  
  const [toDoItemName, setToDoItemName] = useState<string>("");
  const [toDoCompleteByDate, setIsToDoCompleteByDate] = useState<Date>(
    new Date()
  );
  const [toDoTag, setToDoTag] = useState<ToDoTag>(defaultTag);
  const [toDoItemStatus, setToDoItemStatus] = useState<isCompleted>(
    isCompleted.Completed
  );
  const [showAddTagModal, setShowAddTagModal] = useState<boolean>(false);
  const [toDoTags, setToDoTags] = useState<ToDoTag[]>([]);
  useEffect(() => {
    setToDoItemName(toDoItem.name);
    setIsToDoCompleteByDate(toDoItem.completeByDate);
    setToDoItemStatus(toDoItem.completed);
  }, [toDoItem.name, toDoItem.completeByDate, toDoItem.completed]);
  return (
    <div>
      <Collapse in={infoPanelState} dimension={"width"}>
        <div>
          <Form onSubmit={EditToDoFormSubmit} id="edit-todo-panel">
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
              <Row id="todo-name-row">
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
              <Row>
                <Form.Group>
                  <Form.Label>Complete By: </Form.Label>
                  <Form.Control
                    type="date"
                    value={FormateDateForDatePicker(toDoCompleteByDate)}
                    onChange={SaveNewDate}
                  />
                </Form.Group>
              </Row>
              <Row id="todo-status-row">
                <Form.Group>
                  <Form.Label>Status: </Form.Label>
                  <Form.Select
                    value={toDoItemStatus}
                    onChange={(event) => {
                      if (event.target.value === "0") {
                        setToDoItemStatus(isCompleted.NotCompleted);
                      } else {
                        setToDoItemStatus(isCompleted.Completed);
                      }
                    }}
                  >
                    <option value={isCompleted.NotCompleted}>
                      Not Completed
                    </option>
                    <option value={isCompleted.Completed}>Completed</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row id="todo-tag-row">
                <FormGroup>
                  <Form.Label>Tag</Form.Label>
                  <Row>
                    <Col md={5}>
                      <Form.Select
                        value={toDoTag.name}
                        onChange={(event) => {
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
                        }}
                      >
                        <option value={defaultTag.name}>N/A</option>
                        {IterateTagList()}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="outline-success"
                        title="Add Tag"
                        onClick={AddTagClickHandler}
                      >
                        <ToDoAddRowIcon />
                      </Button>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="outline-warning"
                        title="Edit Tags"
                        onClick={EditTagClickHandler}
                      >
                        <ToDoAddRowIcon />
                      </Button>
                    </Col>
                    <Col md={2}>
                      <Button
                        variant="outline-danger"
                        title="Remove Tag From ToDo"
                        onClick={DeleteTagClickHandler}
                      >
                        <ToDoRowDeleteIcon />
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Row>
              <Row id="submit-btn-row">
                <FormGroup>
                  <Button
                    variant="outline-success"
                    type="submit"
                    title="Save Changes"
                  >
                    Save
                  </Button>
                </FormGroup>
              </Row>
            </Col>
          </Form>
        </div>
      </Collapse>
      <ToDoAddTagModal
        showModal={showAddTagModal}
        addTagOnSubmit={AddTag}
        setShowAddTagModal={setShowAddTagModal}
      />
    </div>
  );
  /**
   * Sends the updated toDo back up to Home (so it can be updated in list) and closes the panel
   * @param e
   */
  function EditToDoFormSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const updatedToDo: Todo = {
      id: toDoItem.id,
      name: toDoItemName,
      tag: toDoTag,
      completeByDate: toDoCompleteByDate,
      completed: toDoItemStatus,
    };
    if (updatedToDo.id === -1) {
      addToDo(updatedToDo);
    } else {
      updateToDo(updatedToDo);
    }
    setInfoPanelState(false);
  }
  /**
   * Formats the date and returns it
   * @param completeByDate
   * @returns
   */
  function FormateDateForDatePicker(completeByDate: Date) {
    const formattedDate = format(completeByDate, "YYYY-MM-DD")?.toString();
    // var localBrowserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log(formattedDate);
    return formattedDate;
  }
  /**
   * Saves new date in correct format
   * @param event
   */
  function SaveNewDate(event: React.ChangeEvent<HTMLInputElement>) {
    const st: string = event?.target.value.toString();
    const splitDateString: string[] = st.split("-");
    const year: number = parseInt(splitDateString[0]);
    //We subtract a month because in Date January is 0 month
    const month: number = parseInt(splitDateString[1]) - 1;

    const day: number = parseInt(splitDateString[2]);
    const correctedDate = new Date(year, month, day);
    setIsToDoCompleteByDate(correctedDate);
  }
  function AddTagClickHandler() {
    setShowAddTagModal(true);
  }
  function AddTag(tag: ToDoTag) {
    const updatedTagArray: ToDoTag[] = [...toDoTags];
    tag.id = updatedTagArray.length;
    updatedTagArray.push(tag);
    setToDoTags(updatedTagArray);

    if (updatedTagArray.length === 1) {
      setToDoTag(tag);
    }
  }
  function IterateTagList() {
    return toDoTags.map((tag, i) => (
      <option value={tag.name} key={i}>
        {tag.name}
      </option>
    ));
  }
  // This function would pop up a modal to edit tags
  function EditTagClickHandler() {}
  // This function will delete tag from todo
  function DeleteTagClickHandler() {}
}
