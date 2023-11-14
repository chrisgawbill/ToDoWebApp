import { Col, Row } from "react-bootstrap";

export default function HeaderRow(){
    return(
        <Row>
            <Col xs={1} lg={1}>
                <p>Complete</p>
            </Col>
            <Col xs={4} lg={5}>
                <p>Name</p>
            </Col>
            <Col xs={2} lg={1}>
                <p>Priority</p>
            </Col>
            <Col xs={2} lg={1}>
                <p>Tag</p>
            </Col>
            <Col xs={2} lg={2}>
                <p>Completion Date</p>
            </Col>
        </Row>
    );
}