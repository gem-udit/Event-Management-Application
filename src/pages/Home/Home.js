import React, { useState } from "react";
import './Home.css';
import CreateArea from "../../Components/CreateArea/CreateArea";
import Note from "../../Components/Note/Note";
function Home() {

    const [allNotes, setAllNotes] = useState([]);
    function addNote(newNote) {
        setAllNotes(allPrevNotes => {
            return [...allPrevNotes, newNote];
        });
    }

    return (
        <div className="home">
            <CreateArea onAdd={addNote} />
            <div className="container">
                <div className="row m-1">
                    {allNotes.map((noteItem, index) => {
                        return (<Note key={index} title={noteItem.title} content={noteItem.content} />);
                    })}
                </div>
            </div>
        </div>
    )
}
export default Home;