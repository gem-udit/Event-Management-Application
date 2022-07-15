import React from "react";
import './Event.css'
function Event(props)
{
    return (
            <div className="my-event mb-4 shadow">
                <div className="event-title">{props.title}</div>
                <div className="event-date">{props.eventDate}</div>
                <div className="event-description">{props.description}</div>
            </div>
    )

}
export default Event;
