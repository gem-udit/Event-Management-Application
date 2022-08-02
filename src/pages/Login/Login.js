import React, { useContext, useEffect, useState } from "react";
import PathContext from "../../context/pathContext";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import './Login.css';
function Login() {

    const pathContext = useContext(PathContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
    const [loginFormValues, setLoginFormValues] = useState({
        userName: '',
        password: '',
    });

    const [loginFormErrors, setLoginFormErrors] = useState({
        userName: '',
        password: '',
    });

    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails !== null && userContext.userDetails !== undefined && userContext.userDetails.name.length !== 0) {
            navigate("/home");
        }
    }, [pathContext, userContext, navigate]);

    const isLoginFormValid = () => {
        let isError = loginFormErrors;
        let user = null;
        let isFormValid = true;
        if (loginFormValues.userName === "") {
            isError.userName = "username is required";
            isFormValid = false;
        }
        else {
            let stringObj = localStorage.getItem(loginFormValues.userName);
            user = JSON.parse(stringObj);
            if ((user === null || user === undefined) && loginFormValues.userName !== userContext.adminUser.userName) {
                isError.userName = "username does not exist";
                isFormValid = false;
            }
        }
        if (loginFormValues.password === "") {
            isError.password = "password is required";
            isFormValid = false;
        }
        else {
            if ((user === null || user === undefined) && loginFormValues.password !== userContext.adminUser.password) {
                isError.password = "password is incorrect";
                isFormValid = false;
            }
            else if (user !== null && user !== undefined && user.password !== loginFormValues.password) {
                isError.password = "password is incorrect";
                isFormValid = false;
            }
        }
        setLoginFormErrors((prevData) => {
            return {
                ...prevData,
                isError
            }
        })
        return isFormValid;
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if (isLoginFormValid()) {
            console.log("yes");
            let loggedInUser = null;
            if (loginFormValues.userName === userContext.adminUser.userName) {
                loggedInUser = userContext.adminUser;
            }
            else {
                let stringObj = localStorage.getItem(loginFormValues.userName);
                loggedInUser = JSON.parse(stringObj);
            }

            localStorage.setItem("authorizedUserDetails", JSON.stringify(loggedInUser));
            userContext.updateUser(loggedInUser);
            navigate("/home");
        }
    };

    const formValChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setLoginFormValues(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
        setLoginFormErrors(prevState => {
            return {
                ...prevState,
                [name]: ""
            }
        });
    };

    const isError = loginFormErrors;

    return (
        <div className="row">
            <img className="col-md-7 login-page-image" src="https://ciraig.org/wp-content/uploads/2020/09/undraw_Work_time_re_hdyv.png" alt="" />
            <div className="login-container col-md-5">
                <div>
                    <h1 className="login-heading">Log In</h1>
                    <form className="login-form" onSubmit={onSubmit} noValidate>
                        <input className={isError.userName.length > 0 ? "login-input is-invalid" : "login-input"} type="text" name="userName" placeholder="Enter Username" onChange={formValChange}></input>
                        {isError.userName.length > 0 && (
                            <span className="invalid-feedback">{isError.userName}</span>
                        )}
                        <input className={isError.password.length > 0 ? "login-input is-invalid" : "login-input"} type="password" name="password" placeholder="Enter Password" onChange={formValChange}></input>
                        {isError.password.length > 0 && (
                            <span className="invalid-feedback">{isError.password}</span>
                        )}
                        <button className="login-button" type="submit">Submit</button>
                        <div className="p-2">Don't have a account? <a href="/register">Register Yourself</a></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;