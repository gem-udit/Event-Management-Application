import React from "react";
import './Note.css'
function Note(props)
{
    return (
        <div className="col-md-4">
            <div className="my-note">
                <div>{props.title}</div>
                <div>{props.content}</div>
            </div>
        </div>
    )

}
export default Note;
