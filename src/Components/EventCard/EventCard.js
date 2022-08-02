import React, { useState, useContext } from "react";
import EditEvent from "../EditEvent/EditEvent";
import { db } from '../../firebase/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import UserContext from "../../context/userContext"
import './EventCard.css'
import ShowEvent from "../ShowEvent/ShowEvent";
function EventCard(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [openShowEventModal, setOpenShowEventModal] = useState(false);
    const userContext = useContext(UserContext);

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
    const handleEventTitleClick = () => {
        setOpenShowEventModal(true);
    }
    return (
        <div className="col-md-4 mb-4">
            <div className="event-card">
                <div className="event-title" onClick={handleEventTitleClick}>{props.title}</div>
                <div className="event-date">{props.eventDate.split("-").reverse().join("-")}</div>
                <div className="event-description">{props.description}</div>
                {userContext.userDetails.userName === userContext.adminUser.userName && (
                    <div>
                        <button onClick={handleEditBtnClick} className="edit-button">Edit</button>
                        <button onClick={handleDeleteBtnClick} className="delete-button">Delete</button>
                    </div>)}
                {modalOpen && <EditEvent setOpenModal={setModalOpen} event={props} />}
                {openShowEventModal && <ShowEvent setOpenShowEventModal={setOpenShowEventModal} event={props} />}
            </div>
        </div>
    )

}
export default EventCard;
