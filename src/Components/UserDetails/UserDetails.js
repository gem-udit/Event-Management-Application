import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./UserDetails.css"

function UserDetails({ setOpenUserDetailsModal, user }) {
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg");

    useEffect(() => {
        if (user.profileImg.length !== 0) {
            const fileByteArray = [];
            Object.values(user.profileImg).forEach(value => {
                fileByteArray.push(value);
            });
            let blob = new Blob([Uint8Array.from(fileByteArray)], { type: "image/png" });
            setImage(URL.createObjectURL(blob));
        }
    }, [user])
    const handleClose = () => {
        setOpenUserDetailsModal(false);
    }

    return (
        <Modal show={true} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="container">
                    <div className="user-details-img-container mb-3">
                        <img src={image} className="user-details-profile-img" alt=""></img>
                    </div>
                    <div className="row mb-3">
                        <div className="user-details-title col-md-5">Name</div>
                        <div className="user-details-data col-md-7">{user.name}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="user-details-title col-md-5">UserName</div>
                        <div className="user-details-data col-md-7">{user.userName}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="user-details-title col-md-5">Phone</div>
                        <div className="user-details-data col-md-7">{user.phone}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="user-details-title col-md-5">Email</div>
                        <div className="user-details-data col-md-7">{user.email}</div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
export default UserDetails;