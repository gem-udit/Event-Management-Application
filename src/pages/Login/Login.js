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
            navigate("/Home");
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
            if (user === null || user === undefined) {
                isError.userName = "username does not exist";
                isFormValid = false;
            }
        }
        if (loginFormValues.password === "") {
            isError.password = "password is required";
            isFormValid = false;
        }
        else {
            if (user !== null && user !== undefined && user.password !== loginFormValues.password) {
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
            let stringObj = localStorage.getItem(loginFormValues.userName);
            let loggedInUser = JSON.parse(stringObj);
            localStorage.setItem("authorizedUserDetails", JSON.stringify(loggedInUser));
            userContext.updateUser(loggedInUser);
            navigate("/Home");
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
            <div className="col-md-6 login-page-image">
                <img src="https://wedevs.com/_ipx/https://cdn.wedevs.com/uploads/2022/03/How-to-Redirect-User-to-a-Custom-URL-After-Login.png?f=webp&q=90" alt="" width={"100%"} height={"100%"} />
            </div>
            <div className="login-container col-md-6">
                <div>
                    <h1 className="login-heading">Login</h1>
                    <form className="login-form" onSubmit={onSubmit} noValidate>
                        <input className={isError.userName.length > 0 ? "login-input is-invalid form-control" : "login-input form-control"} type="text" name="userName" placeholder="Enter Username" onChange={formValChange}></input>
                        {isError.userName.length > 0 && (
                            <span className="invalid-feedback">{isError.userName}</span>
                        )}
                        <input className={isError.password.length > 0 ? "login-input is-invalid form-control" : "login-input form-control"} type="password" name="password" placeholder="Enter Password" onChange={formValChange}></input>
                        {isError.password.length > 0 && (
                            <span className="invalid-feedback">{isError.password}</span>
                        )}
                        <button className="login-button" type="submit">Submit</button>
                        <div className="p-2">Don't have a account? <a href="/Register">Register Yourself</a></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;