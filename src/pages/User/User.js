import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import initializeUser from "../../data/InitializeUser";
import "./User.css";
import { SingleEntity, SingleHeading } from "./UserPageSingleDetail";
import { getParticularUser } from '../../services/users.service';
import PathContext from "../../context/pathContext";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState(initializeUser);
    var pathContext = useContext(PathContext);
    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        getParticularUser(userId).then(response => {
            setUser(response)
        }).catch(error => {
            console.log(error);
        });
    }, [userId, pathContext])
    return (
        <div className="container user-container shadow">
            <SingleHeading heading="Personal Details" />
            <div className="row">
                <SingleEntity title="Name" data={user.name} />
                <SingleEntity title="User Name" data={user.username} />
                <SingleEntity title="Email" data={user.email} />
                <SingleEntity title="Phone Number" data={user.phone} />
                <SingleEntity title="Website" data={<a href={"https://" + user.website} target="_blank" rel="noreferrer">{user.website}</a>} />
                <SingleEntity title="Address" data={user.address.street + ", " + user.address.suite + ", " + user.address.city + ", " + user.address.zipcode} />
            </div>
            <hr />
            <SingleHeading heading="Company Details" />
            <div className="row">
                <SingleEntity title="Name" data={user.company.name} />
                <SingleEntity title="Catch Phrase" data={user.company.catchPhrase} />
                <SingleEntity title="Industry" data={user.company.bs} />
            </div>
        </div >);
}
export default User;