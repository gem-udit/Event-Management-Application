import React, { useState } from "react";
import PathContext from "./pathContext";

const PathState = (props) => {
    const [pathName, setPathName] = useState("/");
    const updatePath = (value) => {
        setPathName(value);
    }
    return (
        <PathContext.Provider value={{ pathName, updatePath }}>
            {props.children}
        </PathContext.Provider>
    )
}
export default PathState;