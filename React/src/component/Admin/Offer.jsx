import { useNavigate } from "react-router-dom";
import {useState} from "react";

export default function Offer(){
    const navigate=useNavigate()
    const [id,setId]=useState("")
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [image,setImage]=useState("")
    const [sort,setSort]=useState(0)
    const [content,setContent]=useState([])
    const [week,setWeek]=useState([])
    const [month,setMonth]=useState([])
    const [year,setYear]=useState([])
    const [age,setAge]=useState(0)
    const [install,setInstall]=useState(0)
    const [coins,setCoins]=useState(0)
    const [gems,setGems]=useState(0)

    async function handleSubmit(e){
        await e.preventDefault()
        const formData=new FormData()

        formData.append("id",id)
        formData.append("title",title)
        formData.append("desc",desc)
        formData.append("image_file",image)
        formData.append("sort",sort)
        formData.append("content",content)
        formData.append("week",week)
        formData.append("month",month)
        formData.append("year",year)
        formData.append("age",age)
        formData.append("install",install)
        formData.append("coins",coins)
        formData.append("gems",gems)

        await fetch("http://localhost:5000/Offer",{
            method:"POST",
            body:formData
        })

        setId("")
        setTitle("")
        setDesc("")
        // setImage("")
        setSort(0)
        setContent([])
        setWeek([])
        setMonth([])
        setYear([])
        setAge(0)
        setInstall(0)    
        setCoins(0)
        setGems(0)
        navigate("/admin/home")
    }

    return(
        <>
        <a href="/admin/home">Back</a>
        <form >

            <label htmlFor="offer-id">Offer-ID: </label>
            <input id="offer-id" type={"text"} onChange={(e)=>{setId(e.target.value)}} value={id}></input>
            <br></br>
            <label htmlFor="offer-title">Offer-title:</label>
            <input id="offer-title" type={"text"} onChange={(e)=>{setTitle(e.target.value)}} value={title}></input>
<br></br>
            <label htmlFor="offer-description">Offer-Description: </label>
            <textarea id="offer-description" placeholder="description" onChange={(e)=>{setDesc(e.target.value)}} value={desc}></textarea>
<br></br>
            <label htmlFor="offer-image">Offer-image</label>
            <input id="offer-image" type={"file"} name="profilepic" onChange={(e)=>{setImage(e.target.files[0])}}></input>
<br></br>
            <label id="offer-sort-order">Offer-sort-order</label>
            <input type={"number"} id="offer-sort-order" onChange={(e)=>{setSort(e.target.value)}} value={sort}></input>
<br></br>
            <label htmlFor="content" style={{"border": "2px solid black"}}>Content</label>
            <textarea id="content" onChange={(e)=>{setContent([e.target.value])}} value={content}></textarea>
<br></br>
            <label>Schedule</label>
            <input type={"text"} placeholder="Days of weeks" onChange={(e)=>{setWeek([e.target.value])}} value={week}></input>
            <input type={"text"} placeholder="Days of month" onChange={(e)=>{setMonth([e.target.value])}} value={month}/>
            <input type={"text"} placeholder="Days of year" onChange={(e)=>{setYear([e.target.value])}} value={year}/>
            <br></br>
            <label>Target</label>
            <input type={"number"} placeholder="age" onChange={(e)=>{setAge(e.target.value)}} value={age}></input>
            <input type={"number"} placeholder="installed days" onChange={(e)=>{setInstall(e.target.value)}} value={install}></input>
            <br></br>
            <label>Pricing</label>
            <input type={"number"} placeholder="Coins" onChange={(e)=>{setCoins(e.target.value)}} value={coins}></input>
            <input type={"number"} placeholder="Gems" onChange={(e)=>{setGems(e.target.value)}} value={gems}></input>
            <br></br>
            <button type={"submit"} onClick={handleSubmit}>Submit</button>
        </form>
        </>
    )
}