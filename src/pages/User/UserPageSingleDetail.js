import React from "react";
import "./User.css";
function SingleEntity(entity) {
    return (
        <div className="col-md-4 mb-4">
            <div className="bold-user-text left-padding inc-user-text-size">
                {entity.title}
            </div>
            <div className="left-padding">
                {entity.data}
            </div>
        </div>
    )
}
function SingleHeading(entity){
    return(
        <h2 className="center-text bold-user-text bottom-margin">{entity.heading}</h2>
    )
}
export {SingleEntity, SingleHeading};