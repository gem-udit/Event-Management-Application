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
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" className="navbar-styling">
                <Container>
                    <img src="https://www.cadmiumcd.com/cadmiumcd/new/platform/event-management/media/features-deck/icon-eventmanagement.png" alt="" className="nav-logo" />
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/Home" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Dashboard</NavLink>
                            <NavLink to="/AllUser" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>All Users</NavLink>                        </Nav>
                        <Nav>
                            <div style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px" }}>
                                <span>Hi {userContext.userDetails.name}</span>
                            </div>
                            <img className="profileImg" src={userContext.userImg} alt="" onClick={() => navigate("/UserDetails")} />
                            <NavLink to="/Login" onClick={clearUserContextFields} className="inactive"> Sign Out</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavigationBar;