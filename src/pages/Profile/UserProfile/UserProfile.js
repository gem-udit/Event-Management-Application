import React, { useState, useEffect, useContext, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import PathContext from "../../../context/pathContext";
import UserProfileData from "../../../components/UserProfileData/UserProfileData";
import UserContext from "../../../context/userContext"
import './UserProfile.css';

const UserProfile = () => {

    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg");
    const [profileImageByteArray, setProfileImageByteArray] = useState([]);
    const [btnVisibility, setBtnVisibility] = useState(false);
    const pathContext = useContext(PathContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails === null || userContext.userDetails === undefined || userContext.userDetails.name.length === 0) {
            navigate("/login");
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
        let userProfileImage = null;
        if (profileImageByteArray.length === 0) {
            userProfileImage = userContext.userDetails.profileImg;
        }
        else {
            userProfileImage = profileImageByteArray;
        }
        let updateUserDetail = {
            name: userContext.userDetails.name,
            userName: userContext.userDetails.userName,
            email: userContext.userDetails.email,
            phone: userContext.userDetails.phone,
            password: userContext.userDetails.password,
            profileImg: userProfileImage,

        }
        localStorage.setItem(userContext.userDetails.userName, JSON.stringify(updateUserDetail));
        localStorage.setItem("authorizedUserDetails", JSON.stringify(updateUserDetail));
        userContext.updateUserImg(image);
        userContext.updateProfileImg(profileImageByteArray);
        toast.success("Details Saved");
        setBtnVisibility(false);
    }
    const handleEdit = () => {
        setBtnVisibility(true);
    }

    return (
        <div className="user-profile-backgrond">
            <div className="user-profile-img-container">
                <img src={image} className="user-profile-img" alt=""></img>
            </div>
            <div className="user-profile-data-background">
                <div className="user-profile-data-container">
                    {btnVisibility && <div className="align-button">
                        <button onClick={handleClick} className="update-image-button">Update Image</button>
                    </div>}
                    <div className="user-profile-name">{userContext.userDetails.name}</div>
                    <div>
                        <input type="file" ref={hiddenFileInput} onChange={handleChange} className="hide-file-button" />
                    </div>
                    <UserProfileData title="Name :" data={userContext.userDetails.name} />
                    <UserProfileData title="UserName :" data={userContext.userDetails.userName} />
                    <UserProfileData title="Email :" data={userContext.userDetails.email} />
                    <UserProfileData title="Phone Number :" data={userContext.userDetails.phone} />
                    {userContext.userDetails.userName !== userContext.adminUser.userName && !btnVisibility && <div className="align-button">
                        <button onClick={handleEdit} className="user-edit-btn">Edit</button>
                    </div>}
                    {btnVisibility && <div className="align-button">
                        <button onClick={saveChanges} className="save-changes-btn">Save Changes</button>

                    </div>}
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}
export default UserProfile;
