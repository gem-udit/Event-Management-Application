import React, { useState } from "react";
import ApplicationContext from "./applicationContext";

const ApplicationState = (props) => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
    });
    const [pathName, setPathName] = useState("/");
    const updateUser = (value) => {
        setUserDetails(value);
    }
    const updatePath = (value) => {
        setPathName(value);
    }
    return (
        <ApplicationContext.Provider value={{ pathName, userDetails, updatePath, updateUser }}>
            {props.children}
        </ApplicationContext.Provider>
    )
}
export default ApplicationState;