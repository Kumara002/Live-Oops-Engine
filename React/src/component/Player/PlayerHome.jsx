import {useState} from "react";
import PlayerPost from "./PlayerPost"
import Draggable from 'react-draggable';
import {Link} from "react-router-dom"

export default function PlayerHome(){
    const [Data,setData]=useState([])
    const [age,setAge]=useState(0)
    const [install,setInstall]=useState(0)

    // useEffect(()=>{
    //     fetch("http://localhost:5000/player")
    //     .then((resp)=>{return resp.json()})
    //     .then((data)=>{
    //         console.log(data)
    //         setData(data)
    //     })
    // },[])

    async function handlePlayer(e){
        e.preventDefault()
        await fetch(`http://localhost:5000/player/?age=${age}&install=${install}`)
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            console.log(data)
            setData(data)
        })
    }

    return(
        <>
        <form>
            <label htmlFor="playerId">Player Id</label>
            <input type={"text"} placeholder="player Id" id="playerId"></input>
            <label htmlFor="playerAge">Age</label>
            <input type={"number"} placeholder="Age" id="playerAge" onChange={(e)=>{setAge(e.target.value)}} value={age}></input>
            <label htmlFor="playerInstall">Installed Days</label>
            <input type={"number"} placeholder="Installed Days" id="playerInstall" onChange={(e)=>{setInstall(e.target.value)}} value={install}></input>
            <label htmlFor="coins">Coins</label>
            <input type={"number"} id="coins"></input>
            <label htmlFor="gems">Gems</label>
            <input type={"number"} id="gems"></input>
            <label htmlFor="gameLevel">Game level</label>
            <input type={"number"} id="gameLevle"></input>
            <input type={"checkbox"} id="purchaseFailed"></input>
            <label htmlFor="purchaseFailed">Already done any purchase</label>
            <button type={"submit"} onClick={handlePlayer}>Submit</button>
        </form>
        
        {Data.map((value,index)=>{
                console.log(value,index)
                return (
                    <Draggable key={index}>
                        <div>
                        <PlayerPost postdata={value} key={index}/>
                        </div>
                    </Draggable>
                )
        })}
        <Link to="/"> <button>Logout</button></Link>
       
        </>
    )
}