import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PathContext from "../../../context/pathContext";
import UserConetxt from "../../../context/userContext";
import Heading from "../../../components/Heading/Heading";
import './UserDirectory.css';
import UserDetails from "../../../components/UserDetails/UserDetails";

function UserDirectory() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const [openUserDetailsModal, setOpenUserDetailsModal] = useState(false);
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
        let tempUsers = new Set();
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) !== "authorizedUserDetails")
                tempUsers.add(localStorage.getItem(localStorage.key(i)))
        }
        setUsers([...tempUsers]);
    }, [pathContext, userContext, navigate, setUsers])

    const handleClick = (user) => {
        setOpenUserDetailsModal(true);
        setSelectedUser(JSON.parse(user));
    }
    const changeBackground = (idx) => {
        if (idx % 2 === 0)
            return "user-odd-idx-background"
        return "user-even-idx-background"
    }
    return (
        <div>
            <Heading heading="User Directory" />
            <Table responsive className="m-2">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Email Id</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr className={changeBackground(index)} key={index}>
                                <td>{index + 1}</td>
                                <td onClick={() => (
                                    handleClick(user)
                                )} className="employee-name">{JSON.parse(user).name}</td>
                                <td>{JSON.parse(user).email}</td>
                                <td>{JSON.parse(user).phone}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
            {openUserDetailsModal && <UserDetails setOpenUserDetailsModal={setOpenUserDetailsModal} user={selectedUser} />}
        </div>
    )
}
export default UserDirectory;