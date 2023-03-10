import React from "react";
import {Link} from "react-router-dom"
import LoginPic from "../uploads/login.png"
import "../public/LoginPage.css"


function LoginPage(){
    return (
        <>
        <img src={LoginPic} alt="login pic" width={"50"} height={"50"} id="loginPic"></img>
        <Link to="/admin"><button id="adminButton">Admin</button></Link>
        <Link to="/player/home"><button id="PlayerButton">Player</button></Link>
        </>
    )
}
export default LoginPage;