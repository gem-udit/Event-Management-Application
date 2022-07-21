import React, { useState, useEffect, useContext, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import PathContext from "../../context/pathContext";
import { ProfileSingleRow, ProfileHeading, ProfileImage } from "../../components/SingleField/RegisteredUserDetail/RegistedeUserDetail";
import UserContext from "../../context/userContext"
import './UserDetails.css';

function UserDetails() {

    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg");
    const [profileImageByteArray, setProfileImageByteArray] = useState([]);
    const pathContext = useContext(PathContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails === null || userContext.userDetails === undefined || userContext.userDetails.name.length === 0) {
            navigate("/Login");
        }
        else {
            navigate(window.location.pathname);
        }
        if (userContext.userDetails !== null && userContext.userDetails !== undefined && userContext.userDetails.profileImg.length !== 0) {
            const fileByteArray = [];
            Object.values(userContext.userDetails.profileImg).forEach(value => {
                fileByteArray.push(value);
            });
            let blob = new Blob([Uint8Array.from(fileByteArray)], { type: "image/png" });
            setImage(URL.createObjectURL(blob));
        }
    }, [pathContext, userContext, navigate])

    function handleChange(e) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onloadend = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
                const arrayBuffer = evt.target.result;
                const imageByteArray = new Uint8Array(arrayBuffer);
                setProfileImageByteArray(imageByteArray);
                let blob = new Blob([imageByteArray], { type: "image/png" });
                setImage(URL.createObjectURL(blob));
            }
        }
    }

    function handleClick(event) {
        hiddenFileInput.current.click();
    };
    function saveChanges() {
        let updateUserDetail = {
            name: userContext.userDetails.name,
            userName: userContext.userDetails.userName,
            email: userContext.userDetails.email,
            phone: userContext.userDetails.phone,
            password: userContext.userDetails.password,
            profileImg: profileImageByteArray,

        }
        localStorage.setItem(userContext.userDetails.userName, JSON.stringify(updateUserDetail));
        localStorage.setItem("authorizedUserDetails", JSON.stringify(updateUserDetail));
        userContext.updateUserImg(image);
        userContext.updateProfileImg(profileImageByteArray);
        toast.success("Details Saved");
    }

    return (
        <div className="user-details shadow">
            <ProfileHeading heading="User Details" />
            <ProfileImage image={image} />
            <div className="align-upd-img-button">
                <button onClick={handleClick} className="update-image-button">Update Image</button>
            </div>
            <div>
                <input type="file" ref={hiddenFileInput} onChange={handleChange} className="hide-file-button" />
            </div>
            <ProfileSingleRow title="Name :" data={userContext.userDetails.name} />
            <ProfileSingleRow title="UserName :" data={userContext.userDetails.userName} />
            <ProfileSingleRow title="Email :" data={userContext.userDetails.email} />
            <ProfileSingleRow title="Phone Number :" data={userContext.userDetails.phone} />
            <div className="align-save-button">
                <button onClick={saveChanges} className="save-changes-btn">Save Changes</button>
                <ToastContainer />
            </div>

        </div>
    );
}
export default UserDetails;
