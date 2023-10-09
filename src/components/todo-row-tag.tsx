import { Row } from "react-bootstrap";
import { ToDoTag } from "../data/Tag";
import { useEffect, useState } from "react";

interface ToDoRowTagProps{
    tag:ToDoTag
}
export default function ToDoRowTag({tag}:ToDoRowTagProps){
    const [tagColor, setTagColor] = useState("")
    useEffect(() => {
        setTagColor(tag.color)
        console.log(tag)
    },[tag.color])
    if(tag.id === -1){
        return <></>
    }
    return(
        <Row style={{borderColor:tagColor, borderStyle:"solid", borderWidth:"0.1rem", borderRadius:"10px", textAlign:"center", padding:"0"}}>
            <p>{tag.name}</p>
        </Row>
    )
}