import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import CreateEvent from "../../components/CreateEvent/CreateEvent";
import ShowEvent from "../../components/ShowEvent/ShowEvent";
import PathContext from "../../context/pathContext";
import UserContext from "../../context/userContext";
import { db } from '../../firebase/firebase';
import { collection, addDoc, Timestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import './Home.css';
function Home() {

    const pathContext = useContext(PathContext);
    const userContext = useContext(UserContext);
    const [allEvents, setAllEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllEvents();
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails === null || userContext.userDetails === undefined || userContext.userDetails.name.length === 0) {
            navigate("/Login");
        }
        else {
            navigate(window.location.pathname);
        }
    }, [pathContext, userContext, navigate]);

    const fetchAllEvents = () => {
        const q = query(collection(db, 'allEvents'), orderBy('eventDate', 'desc'))
        onSnapshot(q, (querySnapshot) => {
            setAllEvents(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }

    const addNote = async (newEvent) => {
        fetchAllEvents();
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
            <h2 className="home-text-center">All Events</h2>
            <div className="align-home-event-btn">
                <Button variant="primary" onClick={() => setModalOpen(true)}>
                    Create Event
                </Button>
            </div>
            <div className="home-container">
                {allEvents.map((eventItem, index) => {
                    return (<ShowEvent key={eventItem.id} id={eventItem.id} title={eventItem.data.title} description={eventItem.data.description} eventDate={eventItem.data.eventDate} />);
                })}
            </div>
            <div className="footer">
                Copyright 2022 by Gemini Training
            </div>
            {modalOpen && <CreateEvent setOpenModal={setModalOpen} onAdd={addNote} />}
        </div>
    )
}
export default Home;