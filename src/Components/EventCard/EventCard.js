import React, { useState, useContext } from "react";
import { db } from '../../firebase/firebase';
import { doc, deleteDoc } from "firebase/firestore";
import UserContext from "../../context/userContext"
import './EventCard.css'
import ShowEvent from "../ShowEvent/ShowEvent";
import EventForm from "../EventForm/EventForm";
function EventCard({ eventObj, eventId }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [openShowEventModal, setOpenShowEventModal] = useState(false);
    const userContext = useContext(UserContext);

    const handleDeleteBtnClick = async () => {
        const taskDocRef = doc(db, 'allEvents', eventId)
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
        // <div className="event-card-container">
        //     <div className="event-card-small-container">
        //         <div className="event-card mb-3">
        //             <div className="row">
        //                 <div className="event-image-container col-md-4">
        //                     <img className="event-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg" />
        //                 </div>
        //                 <div className="col-md-8">
        //                     <div className="event-name">Event Name</div>
        //                     <div className="event-date">Event Date</div>
        //                     <div className="event-details">Event Location</div>
        //                     <div className="event-details">Event Mode</div>
        //                 </div>
        //             </div>
        //             <div className="event-description mb-3">Event Description</div>
        //             {userContext.userDetails.userName === userContext.adminUser.userName && (
        //                 <div>
        //                     <button onClick={handleEditBtnClick} className="edit-button">Edit</button>
        //                     <button onClick={handleDeleteBtnClick} className="delete-button">Delete</button>
        //                 </div>)}
        //         </div>
        //         <div className="event-card mb-3">
        //             <div className="row">
        //                 <div className="event-image-container col-md-4">
        //                     <img className="event-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg" />
        //                 </div>
        //                 <div className="col-md-8">
        //                     <div className="event-name">Event Name</div>
        //                     <div className="event-date">Event Date</div>
        //                     <div className="event-details">Event Location</div>
        //                     <div className="event-details">Event Mode</div>
        //                 </div>
        //             </div>
        //             <div className="event-description mb-3">Event Description</div>
        //             {userContext.userDetails.userName === userContext.adminUser.userName && (
        //                 <div>
        //                     <button onClick={handleEditBtnClick} className="edit-button">Edit</button>
        //                     <button onClick={handleDeleteBtnClick} className="delete-button">Delete</button>
        //                 </div>)}
        //         </div>
        //     </div>
        // </div>
        <div className="col-md-4 mb-4">
            <div className="event-card">
                <div className="event-title" onClick={handleEventTitleClick}>{eventObj.title}</div>
                <div className="event-date">{eventObj.eventDate.split("-").reverse().join("-")}</div>
                <div className="event-description">{eventObj.description}</div>
                {userContext.userDetails.userName === userContext.adminUser.userName && (
                    <div>
                        <button onClick={handleEditBtnClick} className="edit-button">Edit</button>
                        <button onClick={handleDeleteBtnClick} className="delete-button">Delete</button>
                    </div>)}
                {modalOpen && <EventForm setOpenModal={setModalOpen} eventObj={eventObj} createEventBtnClicked={false} eventId={eventId} />}
                {openShowEventModal && <ShowEvent setOpenShowEventModal={setOpenShowEventModal} event={eventObj} createEventBtnClicked={true} />}
            </div>
        </div>
    )

}
export default EventCard;
