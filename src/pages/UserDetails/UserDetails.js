import React, { useState, useEffect, useContext, useRef } from "react";
import { UserDetailsSingleRow, UserDetailsHeading, UserDetailsImage } from "./UserDetailsSingleEntity";
import PathContext from "../../context/pathContext";
import UserContext from "../../context/userContext"
import './UserDetails.css';
function UserDetails() {

    const hiddenFileInput = useRef(null);
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg");

    var pathContext = useContext(PathContext);
    var userContext = useContext(UserContext)
    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
    }, [pathContext])

    function handleChange(e) {
        //const filedata = new Blob(e.target.files);
        //const fileByteArray = [];
        const reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onloadend = (evt) => {
            if (evt.target.readyState === FileReader.DONE) {
                const arrayBuffer = evt.target.result;
                const imageByteArray = new Uint8Array(arrayBuffer);
                // for (const a of array) {
                //     fileByteArray.push(a);
                // }
                //console.log(array)
                var blob = new Blob([imageByteArray], { type: "image/png" });
                setImage(URL.createObjectURL(blob));
                //console.log(blob);
            }
        }
    }

    function handleClick(event) {
        hiddenFileInput.current.click();
    };

    return (
        <div className="user-details shadow">
            <UserDetailsHeading heading="User Details" />
            <UserDetailsImage image={image} />
            <div className="align-upd-img-button">
                <button onClick={handleClick} className="update-image-button">Update Image</button>
            </div>
            <div>
                <input type="file" ref={hiddenFileInput} onChange={handleChange} className="hide-file-button" />
            </div>
            <UserDetailsSingleRow title="Name :" data={userContext.userDetails.name} />
            <UserDetailsSingleRow title="UserName :" data={userContext.userDetails.userName} />
            <UserDetailsSingleRow title="Email :" data={userContext.userDetails.email} />
            <UserDetailsSingleRow title="Phone Number :" data={userContext.userDetails.phone} />
        </div>
    );
}
export default UserDetails;
