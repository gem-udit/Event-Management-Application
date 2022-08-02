import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PathContext from "../../context/pathContext";
import UserContext from "../../context/userContext";
import './Register.css';
function Register() {

    const pathContext = useContext(PathContext);
    const userContext = useContext(UserContext);
    const navigate = useNavigate();
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
    });

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
    );

    useEffect(() => {
        pathContext.updatePath(window.location.pathname);
        if (userContext.userDetails !== null && userContext.userDetails !== undefined && userContext.userDetails.name.length !== 0) {
            navigate("/home");
        }
    }, [pathContext, userContext, navigate]);

    const isRegistrationFormValid = () => {
        let isError = registerFormErrors;
        let user = null;
        let isFormValid = true;

        if (registerFormValues.name === "") {
            isError.name = "Name is required";
            isFormValid = false;
        }
        else {
            if (registerFormValues.name.length < 4) {
                isError.name = "Name should contain atleast 4 letters";
                isFormValid = false;
            }
        }
        if (registerFormValues.userName === "") {
            isError.userName = "Username is required";
            isFormValid = false;
        }
        else {
            let stringObj = localStorage.getItem(registerFormValues.userName);
            user = JSON.parse(stringObj);
            if (user !== null && user !== undefined) {
                isError.userName = "Username already exist. Use different username";
                isFormValid = false;
            }
            else if (!userNameRegExp.test(registerFormValues.userName)) {
                isError.userName = "Username should be alphanumeric and length should be between 6 and 20";
                isFormValid = false;
            }
        }
        if (registerFormValues.email === "") {
            isError.email = "Email is Required";
            isFormValid = false;
        }
        else {
            if (!emailRegExp.test(registerFormValues.email)) {
                isError.email = "Email should be in abc@xyz.com format";
                isFormValid = false;
            }
        }
        if (registerFormValues.phone === "") {
            isError.phone = "Phone Number is Required";
            isFormValid = false;
        }
        else {
            if (!phoneRegExp.test(registerFormValues.phone)) {
                isError.phone = "Phone Number should be of 10 digit";
                isFormValid = false;
            }
        }
        if (registerFormValues.newPassword === "") {
            isError.newPassword = "Password is required";
            isFormValid = false;
        }
        else {
            if (!passwordRegExp.test(registerFormValues.newPassword)) {
                isError.newPassword = "Minimum 8 characters are required which should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character";
                isFormValid = false;
            }
        }
        if (registerFormValues.confirmPassword === "") {
            isError.confirmPassword = "confirm password is required";
            isFormValid = false;
        }
        else {
            if (registerFormValues.newPassword !== "" && registerFormValues.newPassword !== registerFormValues.confirmPassword) {
                isError.confirmPassword = 'password not matched';
                isFormValid = false;
            }
        }
        setRegisterFormErrors((prevData) => {
            return {
                ...prevData,
                isError
            }
        });
        return isFormValid;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (isRegistrationFormValid()) {
            const formValues = {
                name: registerFormValues.name,
                userName: registerFormValues.userName,
                email: registerFormValues.email,
                phone: registerFormValues.phone,
                password: registerFormValues.newPassword,
                profileImg: []
            }
            localStorage.setItem(registerFormValues.userName, JSON.stringify(formValues));
            navigate("/login");
        }
    };

    const formValChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setRegisterFormValues(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        });
        setRegisterFormErrors(prevState => {
            return {
                ...prevState,
                [name]: ""
            }
        });
    };

    const isError = registerFormErrors;

    return (
        <div className="row">
            <img className="col-md-7 register-page-image" src="https://ciraig.org/wp-content/uploads/2020/09/undraw_Work_time_re_hdyv.png" alt="" />
            <div className="register-container col-md-5">
                <div className="register-inner-container">
                    <h1 className="register-heading">Register</h1>
                    <form className="register-form" onSubmit={onSubmit} noValidate>
                        <div className="row m-1">
                            <div className="col-md-6">
                                <input className={isError.name.length > 0 ? "register-input is-invalid" : "register-input"} type="text" name="name" placeholder="Enter Name" onChange={formValChange}></input>
                                {isError.name.length > 0 && (
                                    <span className="invalid-feedback">{isError.name}</span>
                                )}
                            </div>
                            <div className="col-md-6">
                                <input className={isError.userName.length > 0 ? "register-input is-invalid" : "register-input"} type="text" name="userName" placeholder="Enter Username" onChange={formValChange}></input>
                                {isError.userName.length > 0 && (
                                    <span className="invalid-feedback">{isError.userName}</span>
                                )}
                            </div>
                        </div>
                        <div className="row m-1">
                            <div className="col-md-6">
                                <input className={isError.email.length > 0 ? "register-input is-invalid" : "register-input"} type="email" name="email" placeholder="Enter Email" onChange={formValChange}></input>
                                {isError.email.length > 0 && (
                                    <span className="invalid-feedback">{isError.email}</span>
                                )}
                            </div>
                            <div className="col-md-6">
                                <input className={isError.phone.length > 0 ? "register-input is-invalid" : "register-input"} type="text" name="phone" placeholder="Enter Phone Number" onChange={formValChange}></input>
                                {isError.phone.length > 0 && (
                                    <span className="invalid-feedback">{isError.phone}</span>
                                )}
                            </div>
                        </div>
                        <div className="row m-1">
                            <div className="col-md-6">
                                <input className={isError.newPassword.length > 0 ? "register-input is-invalid" : "register-input"} type="password" name="newPassword" placeholder="Enter Password" onChange={formValChange}></input>
                                {isError.newPassword.length > 0 && (
                                    <span className="invalid-feedback">{isError.newPassword}</span>
                                )}
                            </div>
                            <div className="col-md-6">
                                <input className={isError.confirmPassword.length > 0 ? "register-input is-invalid" : "register-input"} type="password" name="confirmPassword" placeholder="Confirm Password" onChange={formValChange}></input>
                                {isError.confirmPassword.length > 0 && (
                                    <span className="invalid-feedback">{isError.confirmPassword}</span>
                                )}
                            </div>
                        </div>
                        <button className="register-button mt-3" type="submit">Register</button>
                        <div className="p-2">Already have a account. <a href="/login">Login</a></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Register;