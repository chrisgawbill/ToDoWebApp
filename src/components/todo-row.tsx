import React from "react";
import { Col, Container, Row } from "react-bootstrap";
interface ToDoRowProps {
  name: string;
}
export default function ToDoRow({ name }: ToDoRowProps) {
  return (
    <Container>
      <Col md={2}></Col>
      <Col md={8}>
        <Row>
          <Col md={4}>
            <input type="checkbox"></input>
          </Col>
          <Col md={4}>
            <p>{name}</p>
          </Col>
        </Row>
      </Col>
      <Col md={2}></Col>
    </Container>
  );
}
