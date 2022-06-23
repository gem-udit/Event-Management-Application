import React from "react";
import { Link } from "react-router-dom";
import './Login.css';
function Login() {
    return (
        <div className="row">
            <div className="col-md-6 my-login-page-image">
                <img src="https://wedevs.com/_ipx/https://cdn.wedevs.com/uploads/2022/03/How-to-Redirect-User-to-a-Custom-URL-After-Login.png?f=webp&q=90" alt="" width={"100%"} height={"100%"} />
            </div>
            <div className="my-login-container col-md-6">
                <h1 className="login-heading">Login</h1>
                <form className="my-login-form">
                    <input className="my-login-input" type="text" name="username" placeholder="Enter Username"></input>
                    <input className="my-login-input" type="text" name="password" placeholder="Enter Password"></input>
                    <Link to="/">
                        <button className="my-login-button" type="submit">Submit</button>
                    </Link>
                    <div className="p-2">Don't have a account? <a href ="/Register">Register Yourself</a></div>
                </form>
            </div>
        </div>
    )
}
export default Login;