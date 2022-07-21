import React, { useState } from "react";
import EditEvent from "../EditEvent/EditEvent";
import { db } from '../../firebase/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import './ShowEvent.css'
function ShowEvent(props) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleDeleteBtnClick = async () => {
        const taskDocRef = doc(db, 'allEvents', props.id)
        try {
            await deleteDoc(taskDocRef)
        } catch (err) {
            alert(err)
        }
    }

    const handleEditBtnClick = () => {
        setModalOpen(true);
    }
    return (
        <>
            <div className="show-event mb-4 shadow">
                <div className="event-title">{props.title}</div>
                <div className="event-date">{props.eventDate.split("-").reverse().join("-")}</div>
                <div className="event-description">{props.description}</div>
                <div>
                    <button onClick={handleEditBtnClick} className="edit-button">Edit</button>
                    <button onClick={handleDeleteBtnClick} className="delete-button">Delete</button>
                </div>
            </div>
            {modalOpen && <EditEvent setOpenModal={setModalOpen} event={props} />}
        </>
    )

}
export default ShowEvent;
