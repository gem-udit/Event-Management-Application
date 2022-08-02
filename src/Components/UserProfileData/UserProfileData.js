import React from "react";
import "./UserProfileData.css";
function UserProfileData(entity) {
    return (
        <div className="user-data-container">
            <div className="user-data-small-container">
                <div className="row user-data-row">
                    <div className="col-md-3"></div>
                    <div className="col-md-4 user-data-column-1">
                        {entity.title}
                    </div>
                    <div className="col-md-5 user-data-column-2">
                        {entity.data}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserProfileData;