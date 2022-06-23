import React from "react";
function ModalRow(row)
{
    return (
        <div className="row modal-row">
            <div className="col-md-4 modal-rowtitle">
              {row.title} 
            </div>
            <div className="col-md-8">
              {row.data}
            </div>
          </div>
    )
}
export default ModalRow;