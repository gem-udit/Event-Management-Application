import React from "react";
import "./EmployeeData.css";
function EmployeeData(entity) {
    return (
        <div className="col-md-4 mb-4">
            <div className="employee-profile-title left-padding">
                {entity.title}
            </div>
            <div className="left-padding">
                {entity.data}
            </div>
        </div>
    )
}
export default EmployeeData;