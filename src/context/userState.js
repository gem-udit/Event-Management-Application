import React, { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
    });
    const updateUser = (value) => {
        setUserDetails(value);
    }
    return (
        <UserContext.Provider value={{ userDetails, updateUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;