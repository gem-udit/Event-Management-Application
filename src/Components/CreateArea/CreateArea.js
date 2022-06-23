import React, { useState } from "react";
import './CreateArea.css';
function CreateArea(prop) {
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setNote(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    function submitNote(event) {
        prop.onAdd(note);
        setNote({
            title: "",
            content: ""
        });
        event.preventDefault();
    }

    return (
        <div className="my-createArea-container shadow">
            <h3>Create Note</h3>
            <form onSubmit={submitNote} className="my-createNote-form">
                <input onChange={handleChange} value={note.title} name="title" className="my-createNote-input" placeholder="Title" />
                <textarea onChange={handleChange} value={note.content} name="content" className="my-createNote-input" placeholder="Take a note ..." rows="3" />
                <button type="submit" className="my-createNote-button">Add</button>
            </form>
        </div>
    );
}

export default CreateArea;