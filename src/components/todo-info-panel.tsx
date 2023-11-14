import { Button, Col, Collapse, Form, FormGroup, Row } from "react-bootstrap";
import { format } from "ts-date/esm/locale/en";
import { ToDoAddRowIcon, ToDoEditPanelCancelIcon } from "../assets/icons";
import { Todo, isCompleted } from "../data/Todo";
import { useEffect, useState } from "react";
import "../styles/components/todo-info-panel.css";
import ToDoAddTagModal from "./todo-add-tag-modal";
import { ToDoTag } from "../data/ToDoTag";

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
  const [toDoItemName, setToDoItemName] = useState<string>("");
  const [toDoCompleteByDate, setIsToDoCompleteByDate] = useState<Date>(
    new Date()
  );
  const [toDoItemStatus, setToDoItemStatus] = useState<isCompleted>(
    isCompleted.Completed
  );
  const [showAddTagModal, setShowAddTagModal] = useState<boolean>(false)
  const [toDoTags, setToDoTags] = useState<ToDoTag[]>([])
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
              <Row>
                <FormGroup>
                  <Form.Label>Tag</Form.Label>
                  <Row>
                    <Col md={9}>
                      <Form.Select>
                        {IterateTagList()}
                      </Form.Select>
                    </Col>
                    <Col md={2}>
                      <Button onClick={AddTagClickHandler}>
                        <ToDoAddRowIcon/>
                      </Button>
                    </Col>
                  </Row>
                </FormGroup>
              </Row>
              <Row id="submit-btn-row">
                <FormGroup>
                  <Button variant="outline-success" type="submit">
                    Save
                  </Button>
                </FormGroup>
              </Row>
            </Col>
          </Form>
        </div>
      </Collapse>
      <ToDoAddTagModal showModal={showAddTagModal} addTagOnSubmit={AddTag} setShowAddTagModal={setShowAddTagModal}/>
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
    console.log(month);
    const correctedDate = new Date(year, month, day);
    setIsToDoCompleteByDate(correctedDate);
  }
  function AddTagClickHandler(){
    setShowAddTagModal(true)
  }
  function AddTag(tag:ToDoTag){
    const updatedTagArray:ToDoTag[] = [...toDoTags]
    tag.id = updatedTagArray.length-1
    updatedTagArray.push(tag)
    setToDoTags(updatedTagArray)
  }
  function IterateTagList(){
    return toDoTags.map((tag, i) => (
      <option value={tag.name} key={i}>{tag.name}</option>
    ))
  }
}
