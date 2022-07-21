import React, { useState, useEffect } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("authorizedUserDetails")));
    const [userImg, setUserImg] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg");

    useEffect(() => {
        if (userDetails !== null && userDetails !== undefined && userDetails.profileImg.length !== 0) {
            const fileByteArray = [];
            Object.values(userDetails.profileImg).forEach(value => {
                fileByteArray.push(value);
            });
            let blob = new Blob([Uint8Array.from(fileByteArray)], { type: "image/png" });
            setUserImg(URL.createObjectURL(blob));
        }
    }, [userDetails])

    const adminUser = {
        name: "admin",
        userName: "admin1234",
        email: "admin1234@geminisolutions.com",
        phone: "+120 65430987",
        password: "Gemini@123",
        profileImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
    }
    const updateUser = (value) => {
        setUserDetails(value);
    }
    const updateProfileImg = (value) => {
        setUserDetails((prevData) => {
            return {
                ...prevData,
                profileImg: value
            }
        })
    }
    const updateUserImg = (value) => {
        setUserImg(value);
    }
    return (
        <UserContext.Provider value={{ userDetails, adminUser, userImg, updateUser, updateUserImg, updateProfileImg }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserState;