import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import initializeUser from "../../data/InitializeUser";
import { ApiUserSingleField, ApiUserSingleHeading } from "../../components/SingleField/ApiUserDetail/ApiUserDetail";
import { getParticularUser } from '../../services/users.service';
import PathContext from "../../context/pathContext";
import UserContext from "../../context/userContext";
import "./User.css";

function User() {
    const { userId } = useParams();
    const [user, setUser] = useState(initializeUser);
    let pathContext = useContext(PathContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails === null || userContext.userDetails === undefined || userContext.userDetails.name.length === 0) {
            navigate("/Login");
        }
        else {
            navigate(window.location.pathname);
        }
        getParticularUser(userId).then(response => {
            setUser(response)
        }).catch(error => {
            console.log(error);
        });
    }, [userId, pathContext, userContext, navigate])
    return (
        <div className="container user-container shadow">
            <ApiUserSingleHeading heading="Personal Details" />
            <div className="row">
                <ApiUserSingleField title="Name" data={user.name} />
                <ApiUserSingleField title="User Name" data={user.username} />
                <ApiUserSingleField title="Email" data={user.email} />
                <ApiUserSingleField title="Phone Number" data={user.phone} />
                <ApiUserSingleField title="Website" data={<a href={"https://" + user.website} target="_blank" rel="noreferrer">{user.website}</a>} />
                <ApiUserSingleField title="Address" data={user.address.street + ", " + user.address.suite + ", " + user.address.city + ", " + user.address.zipcode} />
            </div>
            <hr />
            <ApiUserSingleHeading heading="Company Details" />
            <div className="row">
                <ApiUserSingleField title="Name" data={user.company.name} />
                <ApiUserSingleField title="Catch Phrase" data={user.company.catchPhrase} />
                <ApiUserSingleField title="Industry" data={user.company.bs} />
            </div>
        </div >);
}
export default User;