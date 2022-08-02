import React, { useContext } from "react";
import './Navbar.css';
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import UserContext from "../../context/userContext";

function NavigationBar() {
    let userContext = useContext(UserContext);
    const navigate = useNavigate();
    const clearUserContextFields = () => {
        localStorage.setItem("authorizedUserDetails", JSON.stringify({
            name: "",
            userName: "",
            email: "",
            phone: "",
            password: "",
            profileImg: userContext.userDetails.profileImg
        }));
        userContext.updateUser({
            name: "",
            userName: "",
            email: "",
            phone: "",
            password: "",
            profileImg: ""
        });
        userContext.updateUserImg("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg")
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className="navbar-styling">
                <Container>
                    <img src="https://www.cadmiumcd.com/cadmiumcd/new/platform/event-management/media/features-deck/icon-eventmanagement.png" alt="" className="nav-logo" />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Dashboard</NavLink>
                            <NavLink to="/user-directory" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>User Directory</NavLink>
                            <NavLink to="/employee-directory" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Employee Directory</NavLink>
                        </Nav>
                        <Nav>
                            <img className="profileImg" src={userContext.userImg} alt="" onClick={() => navigate("/user-profile")} />
                            <NavLink to="/user-profile" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Your Profile</NavLink>
                            <NavLink to="/login" onClick={clearUserContextFields} className="inactive"> Sign Out</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavigationBar;