import React, { useContext, useEffect, useState } from "react";
import PathContext from "../../context/pathContext";
import UserContext from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import './Login.css';
function Login() {

    const navigate = useNavigate();

    const [loginFormValues, setLoginFormValues] = useState({
        userName: '',
        password: '',
    });

    const [loginFormErrors, setLoginFormErrors] = useState({
        userName: '',
        password: '',
    })
    const [userPassword, setUserPassword] = useState("");
    const pathContext = useContext(PathContext);
    const userContext = useContext(UserContext);
    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
    }, [pathContext])

    const formValid = (isError, formValues) => {
        Object.values(isError).forEach(val => {
            if (val.length > 0) {
                return false;
            }
        });

        let isValid = true;
        if (formValues.userName.length === 0) {
            isError.userName = "Username is required"
            isValid = false;
        }
        if (formValues.password.length === 0) {
            isError.password = "Password is required"
            isValid = false;
        }
        if (!isValid) {
            setLoginFormErrors(prevState => {
                return {
                    ...prevState, isError
                }
            });
        }
        return isValid;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (formValid(loginFormErrors, loginFormValues)) {
            var stringObj = localStorage.getItem(loginFormValues.userName);
            var loggedInUser = JSON.parse(stringObj);
            userContext.updateUser(loggedInUser);
            navigate("/Home")
        }
    };

    const formValChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let isError = loginFormErrors;
        var user = null;

        if (name === "userName") {
            var stringObj = localStorage.getItem(value);
            user = JSON.parse(stringObj);
        }

        if (user !== null) {
            setUserPassword(user.password);
            if (loginFormValues.password.length !== 0) {
                isError.password = (user.password === loginFormValues.password)
                    ? ""
                    : "Password is incorrect";
            }
        }

        switch (name) {
            case "password":
                if (value.length === 0) {
                    isError.password = "Password is Required";
                }
                else {
                    isError.password = (userPassword === value)
                        ? ""
                        : "Password is incorrect";
                }
                break;

            case "userName":
                if (value.length === 0) {
                    isError.userName = "Username is Required";
                }
                else {
                    isError.userName = (user !== null)
                        ? ""
                        : "Username does not exist";
                }
                break;

            default:
                break;
        }
        setLoginFormValues(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
        setLoginFormErrors(prevState => {
            return {
                ...prevState, isError
            }
        });
    };

    const isError = loginFormErrors;
    return (
        <div className="row">
            <div className="col-md-6 my-login-page-image">
                <img src="https://wedevs.com/_ipx/https://cdn.wedevs.com/uploads/2022/03/How-to-Redirect-User-to-a-Custom-URL-After-Login.png?f=webp&q=90" alt="" width={"100%"} height={"100%"} />
            </div>
            <div className="my-login-container col-md-6">
                <div>
                    <h1 className="login-heading">Login</h1>
                    <form className="my-login-form" onSubmit={onSubmit} noValidate>
                        <input className={isError.userName.length > 0 ? "my-login-input is-invalid form-control" : "my-login-input form-control"} type="text" name="userName" placeholder="Enter Username" onChange={formValChange}></input>
                        {isError.userName.length > 0 && (
                            <span className="invalid-feedback">{isError.userName}</span>
                        )}
                        <input className={isError.password.length > 0 ? "my-login-input is-invalid form-control" : "my-login-input form-control"} type="text" name="password" placeholder="Enter Password" onChange={formValChange}></input>
                        {isError.password.length > 0 && (
                            <span className="invalid-feedback">{isError.password}</span>
                        )}
                        <button className="my-login-button" type="submit">Submit</button>
                        <div className="p-2">Don't have a account? <a href="/Register">Register Yourself</a></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;