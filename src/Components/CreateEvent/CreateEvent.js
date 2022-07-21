import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./CreateEvent.css"

function CreateEvent({ setOpenModal, onAdd }) {

  const [myEvent, setMyEvent] = useState({
    title: "",
    description: "",
    eventDate: ""
  });
  const [myEventErros, setMyEventErros] = useState({
    title: "",
    description: "",
    eventDate: ""
  });

  const eventFormValid = (isError, eventFormValues) => {
    Object.values(isError).forEach(val => {
      if (val.length > 0) {
        return false;
      }
    });

    let isValid = true;
    if (eventFormValues.title.length === 0) {
      isError.title = "Title is required"
      isValid = false;
    }
    if (eventFormValues.description.length === 0) {
      isError.description = "Description is required"
      isValid = false;
    }
    if (eventFormValues.eventDate.length === 0) {
      isError.eventDate = "Date is required"
      isValid = false;
    }
    if (!isValid) {
      setMyEventErros(prevState => {
        return {
          ...prevState, isError
        }
      });
    }
    return isValid;
  };

  const handleClose = () => {
    setMyEventErros({
      title: "",
      description: "",
      eventDate: ""
    })
    setMyEvent({
      title: "",
      description: "",
      eventDate: ""
    })
    setOpenModal(false);
  }


  const handleChange = (event) => {
    const { name, value } = event.target;
    let isError = myEventErros;
    switch (name) {
      case "title":
        if (value.length === 0) {
          isError.title = "Title is Required";
        }
        else {
          isError.title =
            (value.length > 30) ? "Title should be less then 30 characters" : "";
        }
        break;

      case "description":
        if (value.length === 0) {
          isError.description = "Description is Required";
        }
        else {
          isError.description = (value.length > 150)
            ? "Description should not exceed 150 characters"
            : "";
        }
        break;

      case "eventDate":
        isError.eventDate = value.length === 0 ? "Date is Required" : "";
        break;

      default:
        break;
    }
    setMyEvent(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
    setMyEventErros((prevState) => {
      return {
        ...prevState,
        isError
      }
    })
  }

  const addEvent = (event) => {
    event.preventDefault();
    if (eventFormValid(myEventErros, myEvent)) {
      onAdd(myEvent);
      handleClose();
    }
  }

  const resetFields = () => {
    setMyEvent({ title: "", description: "", eventDate: "" });
    setMyEventErros({ title: "", description: "", eventDate: "" })
  }
  const isError = myEventErros;
  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="my-createEvent-container" onSubmit={addEvent} onReset={resetFields} noValidate>
          <div className="row mb-1">
            <label className="col-md-3">Title</label>
            <div className="col-md-9">
              <input placeholder="Enter Title" type="text" onChange={handleChange} value={myEvent.title} name="title" className={isError.title.length > 0 ? "my-createEvent-input is-invalid form-control" : "my-createEvent-input form-control"} />
              {isError.title.length > 0 && (
                <span className="invalid-feedback">{isError.title}</span>
              )}
            </div>
          </div>
          <div className="row mb-1">
            <label className="col-md-3">Event Date</label>
            <div className="col-md-9">
              <input type="date" onChange={handleChange}
                name="eventDate"
                className={isError.eventDate.length > 0 ? "my-createEvent-input-date is-invalid form-control" : "my-createEvent-input-date form-control"}></input>
              {isError.eventDate.length > 0 && (
                <span className="invalid-feedback">{isError.eventDate}</span>
              )}
            </div>
          </div>
          <div className="row mb-1">
            <label className="col-md-3">Description</label>
            <div className="col-md-9">
              <textarea onChange={handleChange} value={myEvent.description} name="description" className={isError.description.length > 0 ? "my-createEvent-input is-invalid form-control" : "my-createEvent-input form-control"} placeholder="Enter Description" rows="3" />
              {isError.description.length > 0 && (
                <span className="invalid-feedback">{isError.description}</span>
              )}
            </div>
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
export default CreateEvent;