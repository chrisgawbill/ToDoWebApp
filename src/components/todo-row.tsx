import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../styles/components/todo-row.css";
interface ToDoRowProps {
  name: string,
  rowState:Boolean,
  rowOnClick:Function 
}
export default function ToDoRow({ name, rowState, rowOnClick }: ToDoRowProps) {
  return (
    <Row className="toDoRow" onClick={() => {
      rowOnClick(!rowState)
    }}>
      <Col xs={6} lg={2}>
        <input type="checkbox"></input>
      </Col>
      <Col xs={6} lg={10}>{name}</Col>
    </Row>
  );
}
