import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/components/todo-row.css";
import { Todo } from "../data/Todo";
interface ToDoRowProps {
  toDoItem: Todo,
  rowState:Boolean,
  rowOnClick:Function 
  currentToDoSelected:Function
}
export default function ToDoRow({ toDoItem, rowState, rowOnClick, currentToDoSelected }: ToDoRowProps) {
  return (
    <Row className="toDoRow" onClick={() => {
      rowOnClick(!rowState)
      currentToDoSelected(toDoItem)
    }}>
      <Col xs={6} lg={2}>
        <input type="checkbox"></input>
      </Col>
      <Col xs={6} lg={10}>{toDoItem.name}</Col>
    </Row>
  );
}
