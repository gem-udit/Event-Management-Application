import React from "react";
import { Modal } from "react-bootstrap";
import "./ShowEvent.css"

function ShowEvent({ setOpenShowEventModal, event }) {

    const handleClose = () => {
        setOpenShowEventModal(false);
    }

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Event Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="show-event-title mb-3">
                    {event.title}
                </div>
                <div className="show-event-date">
                    Event Date
                </div>
                <div className="show-event-date-data mb-2">
                    {event.eventDate.split("-").reverse().join("-")}
                </div>
                <div className="show-event-description">
                    Event Mode
                </div>
                <div className="show-event-description-data mb-3">
                    {event.eventMode}
                </div>
                <div className="show-event-description">
                    Event Location
                </div>
                <div className="show-event-description-data mb-3">
                    {event.eventLocation}
                </div>
                <div className="show-event-description">
                    Description
                </div>
                <div className="show-event-description-data mb-3">
                    {event.description}
                </div>
            </Modal.Body>
        </Modal>
    );
}
export default ShowEvent;