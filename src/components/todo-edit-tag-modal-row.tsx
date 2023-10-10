import { Button, Col, Form, Row } from "react-bootstrap";
import { ToDoRowDeleteIcon } from "../assets/icons";
import { ToDoTag } from "../data/Tag";

interface EditTagModalRowProps {
  tag: ToDoTag;
  index: number;
  tagArray: ToDoTag[];
  setTagArray: Function;
}
export default function EditTagModalRow({
  tag,
  index,
  tagArray,
  setTagArray,
}: EditTagModalRowProps) {
  return (
    <Row>
      <Col md={5}>
        <Form.Control
          value={tag.name}
          type="text"
          onChange={(event) => {
            const tagName: string = event.target.value;
            const updatedTagArray: ToDoTag[] = [...tagArray];
            updatedTagArray[index].name = tagName;
            setTagArray(updatedTagArray);
          }}
        />
      </Col>
      <Col md={4}>
        <Form.Control
          value={tag.color}
          type="color"
          onChange={(event) => {
            const tagColor: string = event.target.value;
            const updatedTagArray: ToDoTag[] = [...tagArray];
            updatedTagArray[index].color = tagColor;
            setTagArray(updatedTagArray);
          }}
        />
      </Col>
      <Col md={2}>
        <Button
          variant="outline-danger"
          onClick={() => {
            let updatedTagArray: ToDoTag[] = [...tagArray];
            updatedTagArray = updatedTagArray.filter((t) => t.id !== tag.id);
            setTagArray(updatedTagArray);
          }}
        >
          <ToDoRowDeleteIcon />
        </Button>
      </Col>
    </Row>
  );
}
