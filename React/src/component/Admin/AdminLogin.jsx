import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/AdminLogin.css"

export default function AdminLogin(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [list,updateList]=useState([])
    const navigate=useNavigate()


    async function handleClick(e){
        await e.preventDefault()
        updateList([{"email":{email},"passowrd":{password}}])
        console.log(list)

        await fetch("http://localhost:5000/admin/login",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email:email,password:password})
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data)
           
            let b=data.message
            alert(b)
            navigate("/admin/home")
        }).catch((e)=>{
            console.log(e.message)
        })
        setEmail("")
        setPassword("")
    }

    return(
        <>
        <form className="AdminLogin">
            <label htmlFor="email">Email</label>
            <input type={"email"} id="email" onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
            <br></br>
            <label htmlFor="password">Password</label>
            <input type={"password"}  id="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
            <br></br>
            <button onClick={handleClick} id="loginSubmit">Submit</button>
        </form>
        <a href="/admin">Back</a>
        </>
    )
}