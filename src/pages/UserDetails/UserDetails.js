import React, {useState} from "react";
import './UserDetails.css';
function UserDetails() {

    const hiddenFileInput = React.useRef(null);
    const [image, setImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg");
    
    function handleChange(e) {
        console.log(URL.createObjectURL(e.target.files[0]));
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    function handleClick(event) {
        hiddenFileInput.current.click();
      };

    return (
        <div className="user-details shadow">
            <div className="user-detail-title">
                User Details
            </div>
            <div className="user-img">
                <img src={image} alt="" width={"140px"} height={"100%"} />
            </div>
            <div className="align-upd-img-button">
                <button onClick={handleClick} className="update-image-button">Update Image</button>
            </div>
            <div>
                <input type="file" ref={hiddenFileInput} onChange={handleChange} className="hide-file-button"/>
            </div>
            <div className="row user-detail-row">
                <div className="col-md-5 offset-md-2 user-detail-column-1">
                    Name :
                </div>
                <div className="col-md-5">
                    Udit
                </div>
            </div>
            <div className="row user-detail-row">
                <div className="col-md-5 offset-md-2 user-detail-column-1">
                    Username :
                </div>
                <div className="col-md-5">
                    uditg200
                </div>
            </div>
            <div className="row user-detail-row">
                <div className="col-md-5 offset-md-2 user-detail-column-1">
                    Email :
                </div>
                <div className="col-md-5">
                    uditg200@gmail.com
                </div>
            </div>
            <div className="row user-detail-row">
                <div className="col-md-5 offset-md-2 user-detail-column-1">
                    Phone Number :
                </div>
                <div className="col-md-5">
                    8882029879
                </div>
            </div>
            <div className="row user-detail-row">
                <div className="col-md-5 offset-md-2 user-detail-column-1">
                    Password :
                </div>
                <div className="col-md-5">
                    ************
                </div>
            </div>
        </div>
    );
}
export default UserDetails;
