import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./CreateEventModal.css"
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateEventModal({ setOpenModal, onAdd }) {

  const [myEvent, setMyEvent] = useState({
    title: "",
    description: "",
    eventDate: ""
  });

  const handleClose = () => setOpenModal(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMyEvent(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const addEvent = (event) => {
    event.preventDefault();
    myEvent.eventDate = myEvent.eventDate.split("-").reverse().join("-");;
    onAdd(myEvent);
    setOpenModal(false);
  }

  const resetFields = () => {
    setMyEvent({ title: "", description: "", eventDate: "" });
  }

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="my-createEvent-container" onSubmit={addEvent} onReset={resetFields}>
          <div className="row m-1">
            <label className="col-md-4">Title</label>
            <input placeholder="Enter Title" type="text" onChange={handleChange} value={myEvent.title} name="title" className="my-createEvent-input col-md-8" />
          </div>
          <div className="row m-1">
            <label className="col-md-4">Event Date</label>
            <div className="col-md-8 my-createEvent-input p-0">
              <input type="date" onChange={handleChange}
                name="eventDate"
                className="my-createEvent-input-date"></input>
            </div>
          </div>
          <div className="row m-1">
            <label className="col-md-4">Description</label>
            <textarea onChange={handleChange} value={myEvent.description} name="description" className="my-createEvent-input col-md-8" placeholder="Enter Description" rows="3" />
          </div>
          <div className="my-createEvent-center-btns m-1">
            <button type="submit" className="my-createEvent-btns my-createEvent-submit-btn-color m-1">Submit</button>
            <button type="reset" className="my-createEvent-btns my-createEvent-reset-btn-color m-1">Reset</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default CreateEventModal;