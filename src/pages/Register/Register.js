import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PathContext from "../../context/pathContext";
import './Register.css';
function Register() {

    var pathContext = useContext(PathContext);
    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
    }, [pathContext])

    const navigate = useNavigate();

    const emailRegExp = RegExp(
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    );
    const passwordRegExp = RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    );
    const phoneRegExp = RegExp(
        /^\d{10}$/
    );
    const userNameRegExp = RegExp(
        /^(?=.*\d)[a-zA-Z0-9]{6,20}$/
    )

    const formValid = (isError, formValues) => {
        Object.values(isError).forEach(val => {
            if (val.length > 0) {
                return false;
            }
        });

        let isValid = true;
        if (formValues.name.length === 0) {
            isError.name = "Name is required"
            isValid = false;
        }
        if (formValues.email.length === 0) {
            isError.email = "Email is required"
            isValid = false;
        }
        if (formValues.userName.length === 0) {
            isError.userName = "Username is required"
            isValid = false;
        }
        if (formValues.phone.length === 0) {
            isError.phone = "Phone Number is required"
            isValid = false;
        }
        if (formValues.newPassword.length === 0) {
            isError.newPassword = "Password is required"
            isValid = false;
        }
        if (formValues.confirmPassword.length === 0) {
            isError.confirmPassword = "Confirm Password is required"
            isValid = false;
        }
        if (!isValid) {
            setRegisterFormErrors(prevState => {
                return {
                    ...prevState, isError
                }
            });
        }
        return isValid;
    };

    const [registerFormValues, setRegisterFormValues] = useState({
        name: '',
        userName: '',
        email: '',
        phone: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [registerFormErrors, setRegisterFormErrors] = useState({
        name: '',
        userName: '',
        email: '',
        phone: '',
        newPassword: '',
        confirmPassword: ''
    })

    const onSubmit = (event) => {
        event.preventDefault();
        if (formValid(registerFormErrors, registerFormValues)) {
            const formValues = {
                name: registerFormValues.name,
                userName: registerFormValues.userName,
                email: registerFormValues.email,
                phone: registerFormValues.phone,
                password: registerFormValues.newPassword,
            }
            localStorage.setItem(registerFormValues.userName, JSON.stringify(formValues));
            navigate("/Login")
        }
    };

    const formValChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let isError = registerFormErrors;
        var user = null;

        if (name === "userName") {
            var stringObj = localStorage.getItem(value);
            user = JSON.parse(stringObj);
        }
        switch (name) {
            case "name":
                if (value.length === 0) {
                    isError.name = "Name is Required";
                }
                else {
                    isError.name =
                        (value.length < 4) ? "Name should contain atleast 4 letters" : "";
                }
                break;

            case "email":
                if (value.length === 0) {
                    isError.email = "Email is Required";
                }
                else {
                    isError.email = emailRegExp.test(value)
                        ? ""
                        : "Email should be in abc@xyz.com format";
                }
                break;

            case "newPassword":
                if (value.length === 0) {
                    isError.newPassword = "Password is Required";
                }
                else {
                    isError.newPassword =
                        passwordRegExp.test(value)
                            ? ""
                            : "Minimum 8 characters are required which should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character";
                }
                break;

            case "confirmPassword":
                if (value.length === 0) {
                    isError.confirmPassword = "Confirm Password is Required";
                }
                else {
                    isError.confirmPassword = '';
                    if (value !== registerFormValues.newPassword) {
                        isError.confirmPassword = 'Password not matched';
                    }
                }
                break;

            case "userName":
                if (value.length === 0) {
                    isError.userName = "Username is Required";
                }
                else if (user !== null) {
                    isError.userName = "Username already exist. Use different username"
                }
                else {
                    isError.userName = userNameRegExp.test(value)
                        ? ""
                        : "username should be alphanumeric and length should be between 6 and 20";
                }
                break;

            case "phone":
                if (value.length === 0) {
                    isError.phone = "Phone Number is Required";
                }
                else {
                    isError.phone = phoneRegExp.test(value)
                        ? ""
                        : "Phone Number should be of 10 digit";
                }
                break;

            default:
                break;
        }
        setRegisterFormValues(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
        setRegisterFormErrors(prevState => {
            return {
                ...prevState, isError
            }
        });
    };
    const isError = registerFormErrors;
    return (
        <div className="row">
            <div className="col-md-6 my-register-page-image">
                <img src="https://wedevs.com/_ipx/https://cdn.wedevs.com/uploads/2022/03/How-to-Redirect-User-to-a-Custom-URL-After-Login.png?f=webp&q=90" alt="" width={"100%"} height={"100%"} />
            </div>
            <div className="my-register-container col-md-6">
                <h1 className="register-heading">Register</h1>
                <form className="my-register-form" onSubmit={onSubmit} noValidate>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <input className={isError.name.length > 0 ? "my-register-input is-invalid form-control" : "my-register-input form-control"} type="text" name="name" placeholder="Enter Name" onChange={formValChange}></input>
                            {isError.name.length > 0 && (
                                <span className="invalid-feedback">{isError.name}</span>
                            )}
                        </div>
                        <div className="col-md-6">
                            <input className={isError.userName.length > 0 ? "my-register-input is-invalid form-control" : "my-register-input form-control"} type="text" name="userName" placeholder="Enter Username" onChange={formValChange}></input>
                            {isError.userName.length > 0 && (
                                <span className="invalid-feedback">{isError.userName}</span>
                            )}
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <input className={isError.email.length > 0 ? "my-register-input is-invalid form-control" : "my-register-input form-control"} type="email" name="email" placeholder="Enter Email" onChange={formValChange}></input>
                            {isError.email.length > 0 && (
                                <span className="invalid-feedback">{isError.email}</span>
                            )}
                        </div>
                        <div className="col-md-6">
                            <input className={isError.phone.length > 0 ? "my-register-input is-invalid form-control" : "my-register-input form-control"} type="text" name="phone" placeholder="Enter Phone Number" onChange={formValChange}></input>
                            {isError.phone.length > 0 && (
                                <span className="invalid-feedback">{isError.phone}</span>
                            )}
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <input className={isError.newPassword.length > 0 ? "my-register-input is-invalid form-control" : "my-register-input form-control"} type="password" name="newPassword" placeholder="Enter Password" onChange={formValChange}></input>
                            {isError.newPassword.length > 0 && (
                                <span className="invalid-feedback">{isError.newPassword}</span>
                            )}
                        </div>
                        <div className="col-md-6">
                            <input className={isError.confirmPassword.length > 0 ? "my-register-input is-invalid form-control" : "my-register-input form-control"} type="password" name="confirmPassword" placeholder="Confirm Password" onChange={formValChange}></input>
                            {isError.confirmPassword.length > 0 && (
                                <span className="invalid-feedback">{isError.confirmPassword}</span>
                            )}
                        </div>
                    </div>
                    <button className="my-register-button mt-3" type="submit">Register</button>
                    <div className="p-2">Already have a account. <a href="/Login">Login</a></div>
                </form>
            </div>
        </div>
    )
}
export default Register;