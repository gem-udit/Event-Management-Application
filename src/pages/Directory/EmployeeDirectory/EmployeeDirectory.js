import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { getEmployees } from '../../../services/users.service';
import { useNavigate } from "react-router-dom";
import PathContext from "../../../context/pathContext";
import UserConetxt from "../../../context/userContext";
import Heading from "../../../components/Heading/Heading";
import './EmployeeDirectory.css';

function EmployeeDirectory() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    let pathContext = useContext(PathContext);
    let userContext = useContext(UserConetxt);

    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails === null || userContext.userDetails === undefined || userContext.userDetails.name.length === 0) {
            navigate("/login");
        }
        else {
            navigate(window.location.pathname);
        }
        getEmployees().then(response => {
            setEmployees(response);
        }).catch(error => {
            setEmployees([]);
        });
    }, [pathContext, userContext, navigate])

    const handleClick = (employee) => {
        navigate("/employee-profile/" + employee.id)
    }
    const changeBackground = (idx) => {
        if (idx % 2 === 0)
            return "odd-idx-background"
        return "even-idx-background"
    }
    return (
        <div>
            <Heading heading="Employee Directory" />
            <Table responsive className="m-2">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => {
                        return (
                            <tr className={changeBackground(index)} key={employee.id}>
                                <td>{employee.id}</td>
                                <td onClick={() => (
                                    handleClick(employee)
                                )} className="employee-name">{employee.name}</td>
                                <td>{employee.email}</td>
                                <td><a href={"https://" + employee.website} target="_blank" rel="noreferrer">{employee.website}</a></td>
                                <td>{employee.company.name}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default EmployeeDirectory;