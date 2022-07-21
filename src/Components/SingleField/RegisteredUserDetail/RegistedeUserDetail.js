import React from "react";
import "./RegisteredUserDetail.css";
function ProfileSingleRow(entity) {
    return (
        <div className="row user-detail-row">
            <div className="col-md-5 offset-md-2 user-detail-column-1">
                {entity.title}
            </div>
            <div className="col-md-5">
                {entity.data}
            </div>
        </div>
    )
}
function ProfileHeading(entity) {
    return (
        <div className="user-detail-title">
            {entity.heading}
        </div>
    );
}
function ProfileImage(entity) {
    return (
        <div className="user-img">
            <img src={entity.image} alt="" width={"140px"} height={"100%"} />
        </div>
    );
}
export { ProfileSingleRow, ProfileHeading, ProfileImage };