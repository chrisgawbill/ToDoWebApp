import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { parse, format, formatLocalIso } from "ts-date/esm/locale/en";
import { ToDoEditPanelCancelIcon } from "../assets/icons";
import { Todo, isCompleted } from "../data/Todo";
import { useEffect, useState } from "react";
import "../styles/components/todo-info-panel.css";

interface ToDoInfoPanelProps {
  toDoItem: Todo;
  setInfoPanelState: Function;
  updateToDo: Function;
}
export default function ToDoInfoPanel({
  toDoItem,
  setInfoPanelState,
  updateToDo,
}: ToDoInfoPanelProps) {
  const [toDoItemName, setToDoItemName] = useState<string>("");
  const [toDoCompleteByDate, setIsToDoCompleteByDate] = useState<Date>(
    new Date()
  );
  const [toDoItemStatus, setToDoItemStatus] = useState<isCompleted>(
    isCompleted.Completed
  );
  useEffect(() => {
    setToDoItemName(toDoItem.name);
    setIsToDoCompleteByDate(toDoItem.completeByDate);
    setToDoItemStatus(toDoItem.completed);
  }, [toDoItem.name, toDoItem.completeByDate, toDoItem.completed]);
  return (
    <Form onSubmit={EditToDoFormSubmit}>
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
              <option value={isCompleted.NotCompleted}>Not Completed</option>
              <option value={isCompleted.Completed}>Completed</option>
            </Form.Select>
          </Form.Group>
          <Row id="submit-btn-row">
            <FormGroup>
              <Button variant="outline-success" type="submit">
                Save
              </Button>
            </FormGroup>
          </Row>
        </Row>
      </Col>
    </Form>
  );
  /**
   * Sends the updated toDo back up to Home (so it can be updated in list) and closes the panel
   * @param e
   */
  function EditToDoFormSubmit(e: React.FormEvent<EventTarget>) {
    e.preventDefault();
    const toDo: Todo = {
      id: toDoItem.id,
      name: toDoItemName,
      completeByDate: toDoCompleteByDate,
      completed: toDoItemStatus,
    };
    updateToDo(toDo);
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
}
