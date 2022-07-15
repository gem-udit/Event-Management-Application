import React, { useState, useEffect, useContext } from "react";
import './Home.css';
import CreateEventModal from "../../Components/CreateEventModal/CreateEventModal";
import Button from "react-bootstrap/esm/Button";
import Event from "../../Components/Event/Event";
import PathContext from "../../context/pathContext";
import UserContext from "../../context/userContext";
function Home() {

    const pathContext = useContext(PathContext);
    const userContext = useContext(UserContext)
    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        console.log(userContext.userDetails);
    }, [pathContext, userContext])

    const [allEvents, setAllEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    function addNote(newEvent) {
        setAllEvents(allPrevNotes => {
            return [...allPrevNotes, newEvent];
        });
    }

    return (
        <div className="home">
            <h2 className="home-text-center">All Events</h2>
            <div className="align-home-event-btn">
                <Button variant="primary" onClick={() => setModalOpen(true)}>
                    Create Event
                </Button>
            </div>

            <div className="my-home-container">
                {allEvents.map((eventItem, index) => {
                    return (<Event key={index} title={eventItem.title} description={eventItem.description} eventDate={eventItem.eventDate} />);
                })}
            </div>
            <div className="footer">
                Copyright 2022 by Gemini Training
            </div>
            {modalOpen && <CreateEventModal setOpenModal={setModalOpen} onAdd={addNote} />}
        </div>
    )
}
export default Home;