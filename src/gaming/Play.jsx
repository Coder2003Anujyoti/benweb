import React,{useState,useEffect} from "react";
import {useSearchParams} from "react-router-dom"
import PlayerFirst from './PlayerFirst.jsx';
import ComputerFirst from './ComputerFirst.jsx';
const Play = () => {
  const [searchParams] = useSearchParams();
  const [oppositionteam,setOppositionteam]=useState("")
  const [load,setLoad]=useState(true);
  const [items,setItems]=useState([]);
  const [oppositionplayers,setOppositionplayers]=useState([])
  const [players,setPlayers]=useState([]);
  const [id,setId]=useState([]);
    const [toss,setToss]=useState("");
  const [playerfirst,setPlayerfirst]=useState(false);
  const [computerfirst,setComputerfirst]=useState(false);
  const teamId = searchParams.get("team"); 
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const get_Players=async()=>{
    const res=await fetch(`http://localhost:8000/players?team=${teamId}`)
    const data=await res.json();
    setItems(data);
    setLoad(false);
  }
  const get_Opposition_Players=async()=>{
    const res=await fetch(`http://localhost:8000/players?team=${oppositionteam}`)
    const data=await res.json();
    setOppositionplayers(data.slice(0,10));
  }
  const add_Players=(i)=>{
  
    setPlayers([...players,i]);
    setId([...id,i.name]);
  }
  useEffect(()=>{
    get_Players();
  },[])
  useEffect(()=>{
    if(oppositionteam!='')
    get_Opposition_Players();
  },[oppositionteam])
  const get_Toss=()=>{
    let options=Math.floor(Math.random()*2);
  
    if(options==0){
      let computer_options=Math.floor(Math.random()*2);
      if(computer_options===0){
        setToss("Computer Bat");
      }
      else{
        setToss("Computer Ball");
      }
    }
    if(options===1){
      setToss("Player");
    }
  }
  return (
    <>
      {oppositionteam==='' && 
      <>
<div className="w-full py-8 flex justify-center"><h1 className="text-green-400 text-2xl font-bold shadow-green-400">Select Opposition Team</h1></div>
<div className="w-full  flex flex-wrap gap-x-6 gap-y-4 items-center justify-center flex-row ">
  {teams.map((i)=>{
  if(i!=teamId)
  return(
  <div className="text-center rounded-lg  bg-slate-800" onClick={()=>setOppositionteam(i)}>
    <img src={`Logos/${i}.webp`} className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">{i.toUpperCase()}</h4>
    </div>
    )
  })}
</div>
</>
}
{ oppositionteam!=''&&<>
  {
  load==true && <>
      <div className="flex justify-center items-center py-60">
  <h1 className="text-slate-400 text-2xl font-bold">Loading...</h1>
</div>
  </>
}
{load==false && id.length<10 && <>
  <div className="w-full py-8 flex justify-center">
    <h1 className="text-green-400 text-2xl font-bold shadow-green-400">Choose Your Playing X</h1>
  </div>
  <div className="flex justify-center flex-row flex-wrap gap-4">
    {items.map((i)=>{
    if(!id.includes(i.name))
      return(
      <>
        <div className="text-center rounded-md bg-black  transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105" onClick={()=>add_Players(i)}>
        <img className="w-16 h-16" src={i.image} />
        <p className="text-xs font-bold text-slate-400">{i.name}</p>
        </div>
      </>
      )
    })}
  </div>
</>
}
  </>
  
}
{ id.length==10 && playerfirst===false && computerfirst===false && <>
  
  {
    toss==='' && <>
    <div className="w-full py-8 flex justify-center">
      <h1 className="text-green-400 text-2xl font-bold shadow-green-400">Toss the coin</h1>
    </div>
      <div className="py-8 flex w-full justify-center">
        <img src="Icons/coin.png" className="w-28 h-28" onClick={get_Toss} />
      </div>
    </>
  }
  {
    toss=="Computer Bat" && <>
      <div className="w-full py-20 flex justify-center text-center"><h1 className="text-green-400 text-2xl font-bold shadow-green-400">
      {oppositionteam.toUpperCase()} won toss and elected to Bat first 
      </h1></div>
    <div className="w-full flex justify-center items-center">
      <button className="p-4 font-extrabold text-slate-400 rounded-lg bg-slate-800" onClick={()=>setComputerfirst(true)}>Submit</button>
    </div>
    </>
  }
    {
    toss=="Computer Ball" && <>
      <div className="w-full py-20 flex justify-center text-center"><h1 className="text-green-400 text-2xl font-bold shadow-green-400">
      {oppositionteam.toUpperCase()} won toss and elected to Bowl first 
      </h1></div>
    <div className="w-full flex justify-center items-center">
      <button className="p-4 font-extrabold text-slate-400 rounded-lg bg-slate-800" onClick={()=>setPlayerfirst(true)}>Submit</button>
    </div>
    </>
  }
  {
    toss=="Player" && <>
            <div className="w-full py-20 flex justify-center text-center"><h1 className="text-green-400 text-2xl font-bold shadow-green-400">
      {teamId.toUpperCase()} won toss 
      </h1></div>
      <div className="w-full flex justify-center items-center flex-row gap-28">
  <div className="text-center p-4 rounded-lg bg-slate-800  transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105" onClick={()=>setPlayerfirst(true)}> <img className="w-16 h-16" src="Icons/Batsman.png" /></div>
  <div className="text-center p-4 rounded-lg bg-slate-800  transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105" onClick={()=>setComputerfirst(true)}> <img className="w-16 h-16" src="Icons/Bowler.png" /></div>
      </div>
    </>
  }
</>
}
{
  playerfirst===true && <PlayerFirst players={players} oppositionplayers={oppositionplayers} />
}
{
  computerfirst===true && <ComputerFirst players={players} oppositionplayers={oppositionplayers} />
}
</>
  );
};



export default Play;