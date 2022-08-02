import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import CreateEvent from "../../components/CreateEvent/CreateEvent";
import PathContext from "../../context/pathContext";
import UserContext from "../../context/userContext";
import { db } from '../../firebase/firebase';
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import './Home.css';
import EventCard from "../../components/EventCard/EventCard";
import Heading from "../../components/Heading/Heading";
function Home() {

    const pathContext = useContext(PathContext);
    const userContext = useContext(UserContext);
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails === null || userContext.userDetails === undefined || userContext.userDetails.name.length === 0) {
            navigate("/login");
        }
        else {
            navigate(window.location.pathname);
        }
    }, [pathContext, userContext, navigate]);

    const fetchEvents = () => {
        const q = query(collection(db, 'allEvents'), orderBy('eventDate', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setEvents(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }

    const addNote = async (newEvent) => {
        fetchEvents();
        try {
            await addDoc(collection(db, 'allEvents'), {
                title: newEvent.title,
                description: newEvent.description,
                eventDate: newEvent.eventDate,
                created: Timestamp.now()
            })
        } catch (err) {
            alert(err)
        }
    }

    return (
        <div className="home">
            <Heading heading="All Events" />
            {(userContext.userDetails.userName === userContext.adminUser.userName && <div className="align-home-event-btn">
                <Button className="btn btn-success" onClick={() => setModalOpen(true)}>
                    Create Event
                </Button>
            </div>)}
            {events !== null && events !== undefined && events.length === 0 && <div className="no-quiz-container">
                <div className="no-quiz-text">
                    No Events
                </div>
            </div>}
            {events !== null && events !== undefined && events.length !== 0 && <div className="home-container">
                <div className="row">
                    {events.map((eventItem, index) => {
                        return (<EventCard key={eventItem.id} id={eventItem.id} title={eventItem.data.title} description={eventItem.data.description} eventDate={eventItem.data.eventDate} />);
                    })}
                </div>
            </div>}
            <div className="footer">
                Copyright 2022 by Gemini Training
            </div>
            {modalOpen && <CreateEvent setOpenModal={setModalOpen} onAdd={addNote} />}
        </div>
    )
}
export default Home;