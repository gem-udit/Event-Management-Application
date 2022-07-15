import React, { useContext } from "react";
import './Navbar.css';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import UserContext from "../../context/userContext";

function MyNavbar() {
    var userContext = useContext(UserContext);
    const clearUserContextFields = () => {
        userContext.updateUser({
            name: "",
            userName: "",
            email: "",
            phone: "",
            password: "",
        });
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className="my-navbar-styling">
                <Container>
                    <img src="https://www.cadmiumcd.com/cadmiumcd/new/platform/event-management/media/features-deck/icon-eventmanagement.png" alt="" className="nav-logo" />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/Home" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Dashboard</NavLink>
                            <NavLink to="/AllUser" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>All Users</NavLink>                        </Nav>
                        <Nav>
                            <NavLink to="/UserDetails" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>User Details</NavLink>
                            <NavLink to="/Login" onClick={clearUserContextFields} className="inactive"> Sign Out</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default MyNavbar;