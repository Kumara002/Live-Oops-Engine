import React from "react";
import {Link} from "react-router-dom";
import LoginPic from "../../uploads/login.png"
import "../../public/Admin.css"

function Admin(){
    return(
        <>
        <img src={LoginPic} alt="loginPic" id="adminloginpic"></img>
        <Link to="/admin/login"><button id="loginButton">Login</button></Link>
        <Link to="/admin/reg"><button id="signinButton">Sign in</button></Link>
        <a href="/" id="AdminBack">Back</a>
        </>
    )
}
export default Admin;