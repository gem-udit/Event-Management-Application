import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { db } from '../../firebase/firebase';
import { toast } from 'react-toastify';
import { collection, query, onSnapshot, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore'
import "./EventForm.css"

function EventForm({ setOpenModal, eventObj, createEventBtnClicked, eventId }) {

    const [event, setEvent] = useState({
        title: eventObj.title,
        description: eventObj.description,
        eventDate: eventObj.eventDate,
        eventLocation: eventObj.eventLocation,
        eventMode: eventObj.eventMode
    });
    const [eventErros, setEventErros] = useState({
        title: "",
        description: "",
        eventDate: "",
        eventLocation: "",
        eventMode: ""
    });

    const [indianStates, setIndianStates] = useState([])
    const [eventModes, setEventModes] = useState([]);

    const fetchStates = () => {
        const q = query(collection(db, 'states'));
        onSnapshot(q, (querySnapshot) => {
            let stateObj = querySnapshot.docs[0].data();
            let stateObjArray = [];
            Object.keys(stateObj).forEach(key => {
                stateObjArray.push({
                    id: key,
                    data: stateObj[key]
                })
            });

            stateObjArray.sort((a, b) => {
                if (a.data < b.data)
                    return -1;
                else if (a.data > b.data)
                    return 1;
                else
                    return 0;
            });

            setIndianStates(stateObjArray);
        })
    }

    const fetchModesOfEvent = () => {
        const q = query(collection(db, 'event-type'))
        onSnapshot(q, (querySnapshot) => {
            setEventModes(querySnapshot.docs.map(doc => ({
                id: doc.data().id,
                data: doc.data().data
            })))
        })
    }

    useEffect(() => {
        fetchStates();
        fetchModesOfEvent();
    }, [])

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
        if (eventFormValues.eventMode.length === 0) {
            isError.eventMode = "Mode is required"
            isValid = false;
        }
        if (eventFormValues.eventLocation.length === 0) {
            isError.eventLocation = "Event Location is required"
            isValid = false;
        }
        if (!isValid) {
            setEventErros(prevState => {
                return {
                    ...prevState, isError
                }
            });
        }
        return isValid;
    };

    const handleClose = () => {
        setEventErros({
            title: "",
            description: "",
            eventDate: "",
            eventModes: "",
            eventLocation: "",
        })
        setEvent({
            title: "",
            description: "",
            eventDate: "",
            eventModes: "",
            eventLocation: "",
        })
        setOpenModal(false);
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        let isError = eventErros;
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

            case "eventLocation":
                isError.eventLocation = value.length === 0 ? "Event Location is Required" : "";
                break;

            case "eventMode":
                isError.eventMode = value.length === 0 ? "Event Mode is Required" : "";
                break;

            default:
                break;
        }
        setEvent(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
        setEventErros((prevState) => {
            return {
                ...prevState,
                isError
            }
        })
    }

    const addEvent = async (e) => {
        e.preventDefault();
        if (eventFormValid(eventErros, event)) {
            try {
                await addDoc(collection(db, 'allEvents'), {
                    title: event.title,
                    description: event.description,
                    eventDate: event.eventDate,
                    eventLocation: event.eventLocation,
                    eventMode: event.eventMode,
                    created: Timestamp.now()
                })
                toast.success("Event Created Saved");
            } catch (err) {
                alert(err)
            }
            handleClose();
        }
    }

    const editEvent = async (e) => {
        e.preventDefault();
        if (eventFormValid(eventErros, event)) {
            const taskDocRef = doc(db, 'allEvents', eventId)
            try {
                await updateDoc(taskDocRef, {
                    title: event.title,
                    description: event.description,
                    eventDate: event.eventDate,
                    eventLocation: event.eventLocation,
                    eventMode: event.eventMode,
                })
                toast.success("Event Updated Saved");
            } catch (err) {
                alert(err)
            }
            handleClose();
        }
    }

    const resetFields = () => {
        setEvent({ title: "", description: "", eventDate: "", eventLocation: "", eventMode: "" });
        setEventErros({ title: "", description: "", eventDate: "", eventLocation: "", eventMode: "" })
    }
    const isError = eventErros;
    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="my-eventform-container" onSubmit={createEventBtnClicked ? addEvent : editEvent} onReset={resetFields} noValidate>
                    <div className="row mb-1">
                        <label className="create-label col-md-4">Title</label>
                        <div className="col-md-8">
                            <input placeholder="Enter Title" type="text" onChange={handleChange} value={event.title} name="title" className={isError.title.length > 0 ? "my-eventform-input is-invalid form-control" : "my-eventform-input form-control"} />
                            {isError.title.length > 0 && (
                                <span className="invalid-feedback">{isError.title}</span>
                            )}
                        </div>
                    </div>
                    <div className="row mb-1">
                        <label className="create-label col-md-4">Event Date</label>
                        <div className="col-md-8">
                            <input type="date" onChange={handleChange}
                                value={event.eventDate}
                                name="eventDate"
                                className={isError.eventDate.length > 0 ? "my-eventform-input-date is-invalid form-control" : "my-eventform-input-date form-control"}></input>
                            {isError.eventDate.length > 0 && (
                                <span className="invalid-feedback">{isError.eventDate}</span>
                            )}
                        </div>
                    </div>
                    <div className="row mb-1">
                        <label className="create-label col-md-4">Event Location</label>
                        <div className="col-md-8">
                            <select name="eventLocation" value={event.eventLocation} onChange={handleChange} className={isError.eventLocation.length > 0 ? "my-eventform-input-date is-invalid form-control form-select" : "my-eventform-input-date form-control form-select"}>
                                {indianStates.map((state) => {
                                    return (<option key={state.id} value={state.data}>{state.data}</option>);
                                })}
                                <option value="" hidden>Not Selected</option>
                            </select>
                            {isError.eventLocation.length > 0 && (
                                <span className="invalid-feedback">{isError.eventLocation}</span>
                            )}
                        </div>
                    </div>
                    <div className="row mb-1">
                        <label className="create-label col-md-4">Mode of Event</label>
                        <div className="col-md-8">
                            <select name="eventMode" value={event.eventMode} onChange={handleChange} className={isError.eventMode.length > 0 ? "my-eventform-input-date is-invalid form-control form-select" : "my-eventform-input-date form-control form-select"}>
                                {eventModes.map((mode) => {
                                    return (<option key={mode.id} value={mode.data}>{mode.data}</option>);
                                })}
                                <option value="" hidden>Not Selected</option>
                            </select>
                            {isError.eventMode.length > 0 && (
                                <span className="invalid-feedback">{isError.eventMode}</span>
                            )}
                        </div>
                    </div>
                    <div className="row mb-1">
                        <label className="create-label col-md-4">Description</label>
                        <div className="col-md-8">
                            <textarea onChange={handleChange} value={event.description} name="description" className={isError.description.length > 0 ? "my-eventform-input is-invalid form-control" : "my-eventform-input form-control"} placeholder="Enter Description" rows="3" />
                            {isError.description.length > 0 && (
                                <span className="invalid-feedback">{isError.description}</span>
                            )}
                        </div>
                    </div>
                    <div className="my-eventform-center-btns m-1">
                        <button type="submit" className="my-eventform-btns my-eventform-btn-color m-1">{createEventBtnClicked ? "Submit" : "Edit"}</button>
                        <button type="reset" className="my-eventform-btns my-eventform-btn-color m-1">Reset</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}
export default EventForm;