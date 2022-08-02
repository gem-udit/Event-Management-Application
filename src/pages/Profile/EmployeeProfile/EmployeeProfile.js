import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import initializeUser from "../../../data/InitializeUser";
import EmployeeData from "../../../components/EmployeeData/EmployeeData";
import { getEmployee } from '../../../services/users.service';
import PathContext from "../../../context/pathContext";
import UserContext from "../../../context/userContext";
import Heading from "../../../components/Heading/Heading";
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
    const { empId } = useParams();
    const [user, setUser] = useState(initializeUser);
    let pathContext = useContext(PathContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails === null || userContext.userDetails === undefined || userContext.userDetails.name.length === 0) {
            navigate("/login");
        }
        else {
            navigate(window.location.pathname);
        }
        getEmployee(empId).then(response => {
            setUser(response)
        }).catch(error => {
            console.log(error);
        });
    }, [empId, pathContext, userContext, navigate])
    return (
        <div className="employee-container">
            <div className="employee-small-container">
                <Heading heading="Personal Details" />
                <div className="row">
                    <EmployeeData title="Name" data={user.name} />
                    <EmployeeData title="User Name" data={user.username} />
                    <EmployeeData title="Email" data={user.email} />
                    <EmployeeData title="Phone Number" data={user.phone} />
                    <EmployeeData title="Website" data={<a href={"https://" + user.website} target="_blank" rel="noreferrer">{user.website}</a>} />
                    <EmployeeData title="Address" data={user.address.street + ", " + user.address.suite + ", " + user.address.city + ", " + user.address.zipcode} />
                </div>
                <hr />
                <Heading heading="Company Details" />
                <div className="row">
                    <EmployeeData title="Name" data={user.company.name} />
                    <EmployeeData title="Catch Phrase" data={user.company.catchPhrase} />
                    <EmployeeData title="Industry" data={user.company.bs} />
                </div>
            </div >
        </div>
    );
}
export default EmployeeProfile;