import React, { useState,useEffect } from "react";
import './AllUser.css';
import MyModal from "../../Components/Modal/Modal"
import { Table } from "react-bootstrap";
import {getAllUsers} from '../../services/users.service'


function AllUser() {
    const [users,setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(()=>{
        getAllUsers().then(response=>{
            setUsers(response);
        }).catch(error=>{
            setUsers([]);
        });
    },[])

    function handleClick(user) {
        setModalOpen(true);
        setSelectedUser(user)
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
                {modalOpen && <MyModal setOpenModal={setModalOpen} userId={selectedUser.id} />}</>
    )
}
export default AllUser;