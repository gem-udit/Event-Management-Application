import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ModalRow from "./ModalRow";
import "./Modal.css";
import { getParticularUser } from "../../services/users.service"
const initializeUser = {
  id: 0,
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
  },
  company: {
    name: '',
    catchPhrase: '',
    bs: ''
  }

}

function MyModal({ setOpenModal, userId }) {

  const handleClose = () => setOpenModal(false);
  const [user, setUser] = useState(initializeUser);

  useEffect(() => {
    getParticularUser(userId).then(response => {
      console.log(response.name);
      setUser(response);
    }).catch(error => {
      setUser({});
    });
  },[userId])
  
  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>User Details</h3>
        </Modal.Header>
        <Modal.Body>
          <h5 className="modal-title">Personal Details</h5>
          <ModalRow title="Name : " data={user.name} />
          <ModalRow title="UserName : " data={user.username} />
          <ModalRow title="Email : " data={user.email} />
          <ModalRow title="Address : " data={user.address.street + ", " + user.address.suite + ", " + user.address.city + ", " + user.address.zipcode} />
          <ModalRow title="Phone Number : " data={user.phone} />
          <ModalRow title="Website : " data={user.website} />
          <hr />
          <h5 className="modal-title">Company Details</h5>
          <ModalRow title="Company Name : " data={user.company.name} />
          <ModalRow title="Catch Phrase : " data={user.company.catchPhrase} />
          <ModalRow title="Industry : " data={user.company.bs} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyModal;