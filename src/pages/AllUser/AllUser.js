import React, { useState, useEffect, useContext } from "react";
import './AllUser.css';
import { Table } from "react-bootstrap";
import { getAllUsers } from '../../services/users.service';
import { useNavigate } from "react-router-dom";
import PathContext from "../../context/pathContext";
import UserConetxt from "../../context/userContext"

function AllUser() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    let pathContext = useContext(PathContext);
    let userContext = useContext(UserConetxt);

    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails === null || userContext.userDetails === undefined || userContext.userDetails.name.length === 0) {
            navigate("/Login");
        }
        else {
            navigate(window.location.pathname);
        }
        getAllUsers().then(response => {
            setUsers(response);
        }).catch(error => {
            setUsers([]);
        });
    }, [pathContext, userContext, navigate])

    const handleClick = (user) => {
        navigate("/User/" + user.id)
    }
    return (
        <>
            <h1 className="all-user-page-title">All Users</h1>
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
                    {users.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td onClick={() => (
                                    handleClick(user)
                                )} className="serial-number">{user.name}</td>
                                <td>{user.email}</td>
                                <td><a href={"https://" + user.website} target="_blank" rel="noreferrer">{user.website}</a></td>
                                <td>{user.company.name}</td>
                            </tr>)

                    })}
                </tbody>
            </Table>
        </>
    )
}
export default AllUser;