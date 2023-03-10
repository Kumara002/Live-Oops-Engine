import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import Post from "./Post";
import Draggable from 'react-draggable';

export default function AdminHome(){
    const [Data,setData]=useState([])
    const [search,setSearch]=useState("")

    fetch("http://localhost:5000/list")
    .then((resp)=>{ return resp.json()})
    .then((data)=>{
        console.log(data)
        // setData(data)
    }).catch(err=>console.log("err",err.message))

     useEffect(()=>{
        fetch("http://localhost:5000/list")
    .then((resp)=>{ return resp.json()})
    .then((data)=>{
        console.log("data we searched",data)
        setData(data)
    }).catch(err=>console.log("err",err.message))
     },[])

     async function handleSearch(e){
        e.preventDefault()
        setData([])
        await fetch(`http://localhost:5000/search/${search}`)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            console.log(data)
            setData(data)
        }).catch(err=>console.log("err",err.message))
        // window.location.reload(false);
     }


    return(
        <>
        <header>
            <form id="homeForm">
            <input type={"text"} placeholder="Offer id" id="adminSearch" onChange={(e)=>{setSearch(e.target.value)}} value={search}></input>
            <button type={"submit"} id="SearchButton" onClick={handleSearch}>Search</button>
            </form>
        </header>
        <nav>
            <Link to={"/offer"}><button>Create Offer</button></Link>
        </nav>
        <section className="section"> 
        {Data.map((value,index)=>{
                console.log(value,index)
                return (
                    <Draggable key={index}>
                        <div>
                        <Post postdata={value} key={index}/>
                        </div>
                    </Draggable>
                )
        })}
            
        </section>
        <footer>
            <Link to={"/admin"}><button>Logout</button></Link>
        </footer>
        </>
    )
}