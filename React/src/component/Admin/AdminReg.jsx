import {useState} from "react";

export default function AdminReg(){
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [reg,updateReg]=useState([])

    async function handlereg(e){
        await e.preventDefault()
        updateReg([{"name":name,"email":email,"password":password}])
        console.log(reg)

        await fetch("http://localhost:5000/admin/reg",{
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name:name,email:email,password:password})
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data)
            let a=data.status
            let b=data.messge
            alert(b,a)
        }).catch((e)=>{
            console.log(e.message)
        })
        setName("")
        setEmail("")
        setPassword("")
    }

    return(
        <>
        <form  >
            <label htmlFor="name">Name</label>
            <input id="name" type={"text"} onChange={(e)=>{setName(e.target.value)}} value={name}></input>
            <label htmlFor="adminRegName">Email</label>
            <input id="adminRegName" type={"email"} onChange={(e)=>{setEmail(e.target.value)}} value={email}></input>
            <label htmlFor="adminRegPass">Password</label>
            <input id="adminRegPass" type={"password"} onChange={(e)=>{setPassword(e.target.value)}} value={password}></input>
            <button type="submit" onClick={handlereg}>Submit</button>
        </form>
        <a href="/admin">Back</a>
        </>
    )
}