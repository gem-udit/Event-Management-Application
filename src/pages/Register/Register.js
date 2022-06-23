import React from "react";
import { Link } from "react-router-dom";
import './Register.css';
function Register() {
    return (
        <div className="row">
            <div className="col-md-6 my-register-page-image">
                <img src="https://wedevs.com/_ipx/https://cdn.wedevs.com/uploads/2022/03/How-to-Redirect-User-to-a-Custom-URL-After-Login.png?f=webp&q=90" alt="" width={"100%"} height={"100%"} />
            </div>
            <div className="my-register-container col-md-6">
                <h1 className="register-heading">Register</h1>
                <form className="my-register-form">
                    <div className="row m-1">
                        <div className="col-md-6">
                            <input className="my-register-input" type="text" name="name" placeholder="Enter Name"></input>
                        </div>
                        <div className="col-md-6">
                            <input className="my-register-input" type="text" name="username" placeholder="Enter Username"></input>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <input className="my-register-input" type="email" name="email" placeholder="Enter Email"></input>
                        </div>
                        <div className="col-md-6">
                            <input className="my-register-input" type="text" name="phone" placeholder="Enter Phone Number"></input>
                        </div>
                    </div>
                    <div className="row m-1">
                        <div className="col-md-6">
                            <input className="my-register-input" type="password" name="new-password" placeholder="Enter Password"></input>
                        </div>
                        <div className="col-md-6">
                            <input className="my-register-input" type="password" name="confirm-password" placeholder="Confirm Password"></input>
                        </div>
                    </div>
                    <Link to="/Login">
                        <button className="my-register-button mt-3" type="submit">Register</button>
                    </Link>
                    <div className="p-2">Already have a account. <a href ="/Login">Login</a></div>
                </form>
            </div>
        </div>
    )
}
export default Register;