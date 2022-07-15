import React from "react";
import "./UserDetails.css";
function UserDetailsSingleRow(entity) {
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
function UserDetailsHeading(entity){
    return (
        <div className="user-detail-title">
            {entity.heading}
        </div>
    );
}
function UserDetailsImage(entity){
    return (
        <div className="user-img">
            <img src={entity.image} alt="" width={"140px"} height={"100%"} />
        </div>
    );
}
export {UserDetailsSingleRow,UserDetailsHeading,UserDetailsImage};