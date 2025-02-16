import React,{useState,useEffect} from "react";
import Toss from "./Toss.jsx";
const Auction = () => {
  const [load,setLoad]=useState(true);
  const [value,setValue]=useState([]);
  const [playerteam,setPlayerteam]=useState("");
  const [computerteam,setComputerteam]=useState("");
  const [name,setName]=useState([])
  const [show,setShow]=useState(true)
  const [amount,setAmount]=useState(0)
  const [bid,setBid]=useState(0);
  const [turn,setTurn]=useState("");
  const [display,setDisplay]=useState(true);
  const [sold,setSold]=useState("");
  const [off,setOff]=useState(false);
  const [index,setIndex]=useState(0);
  const [purse,setPurse]=useState(50000)
  const [players,setPlayers]=useState([]);
  const [playing,setPlaying]=useState(false);
  const [computers,setComputers]=useState([])
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const get_data=async()=>{
  const response=await fetch("https://prepared-josy-handcricket-0e7a326f.koyeb.app/");
  const item= await response.json();
  let rand_team=teams[Math.floor(Math.random()*10)]
  setValue(item.data)
  setLoad(false)
  setAmount(Math.floor(Math.random()*100)+1)
  setIndex(Math.floor(Math.random()*150))
}
 const add=()=>{
   if(bid==0){
  if(purse>=amount){
   setTurn(playerteam);
   setBid(amount);
   setDisplay(false)
  }
  else{
    alert("Your Low budget")
    window.location.href="https://coder2003anujyoti.github.io/benweb/"
  }
   }
   if(bid!=0){
       if(purse>=bid+5){
     setTurn(playerteam);
   setBid(bid+5);
   setDisplay(false)
   setOff(false)
   setShow(false)
       }
       else{
    alert("Your Low budget")
    window.location.href="https://coder2003anujyoti.github.io/benweb/"
  }
   }
 }
 const go=()=>{
       const store=value.filter((i,ind)=>ind==index);
    setComputers([...computers,{name:store[0].name,image:store[0].image,bid:bid>0?bid:amount,runs:0,wickets:0,team:computerteam}])
      setName([...name,store[0].name])
      setSold(computerteam)
      setOff(true)
      setDisplay(false)
 }
 const next=()=>{
   const val=value.filter((i,ind)=>ind!=index);
   setValue(val);
  setAmount(Math.floor(Math.random()*100)+1)
  setIndex(Math.floor(Math.random()*150))
  setOff(false);
  setShow(true)
  setDisplay(true)
  setBid(0);
  setTurn("")
  setSold("")
 }
 const play=()=>{
   if(computers.length<10){
   let r= value.map((i)=>{
         setComputers((prev)=>prev.length<10 && !name.includes(i.name)?[...prev,{name:i.name,image:i.image,bid:amount,runs:0,wickets:0,team:computerteam}]:prev); 
    });
    setPlaying(true)
   }
   else{
     setPlaying(true);
   }
 }
 const select=(i)=>{
   const str=teams.filter((item)=>item!=i)
   setPlayerteam(i);
   setComputerteam(str[Math.floor(Math.random()*9)]);
 }
 useEffect(()=>{
  if(turn!=''){
  if(turn===playerteam){
    setTimeout(function() {
   let rand=Math.floor(Math.random()*100);
    if(rand%7==0){
    const store=value.filter((i,ind)=>ind==index);
    setPlayers([...players,{name:store[0].name,image:store[0].image,bid:bid>0?bid:amount,runs:0,wickets:0,team:playerteam}])
    setName([...name,store[0].name])
      setSold(playerteam);
      setPurse(purse-bid);
      setDisplay(false);
      setOff(true)
    }
    else{
      setBid(bid+5);
      setTurn(computerteam);
      setOff(false)
      setTimeout(()=>{
      setDisplay(true)},1000);
    }
    },1000)
  }
  
  if(turn===computerteam){
    setTimeout(function() {
      setDisplay(true);
      setOff(false);
      setShow(true);
    },1000);
  }
 }},[turn])
  useEffect(()=>{
    get_data();
  },[])
  return (
  <>
      {load==true && <>
    <div className="w-full flex flex-col items-center justify-center py-40">
       <div className="w-full flex justify-center items-center">
    <img src="Logos/Logo.webp" className="w-30 h-24" />
    </div>
   <div className="w-full flex justify-center gap-y-2  text-center flex-col p-4 mt-4">

    <div className="mt-4 flex flex-row flex-wrap justify-center gap-x-12 gap-y-12 ">
  {new Array(4).fill("").map((i,ind)=>{
  return(
  <div className="text-center">
    <img src={`sponsor/sponsor${ind+1}.png`} className="w-22 h-14"></img>
    </div>
    )
  })}
</div>
    </div>
    </div>
  </>}
{
  load===false && playing==false && <>
    {playerteam==='' && <>
    <div className="w-full flex-col mt-2 flex text-center justify-center">
  <div className="w-full mt-2 flex justify-center">
 <h1 className="text-green-400 text-2xl font-bold shadow-green-400">Select your Team</h1></div>
<div className="w-full mt-4 flex flex-wrap gap-x-6 gap-y-4 items-center justify-center  p-2 flex-row">
  {teams.map((i)=>{
  if(i!=computerteam)
  return(
  <div className="text-center rounded-lg  bg-slate-800" onClick={()=>select(i)}>
    <img src={`Logos/${i}.webp`} className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">{i.toUpperCase()}</h4>
    </div>
    )
  })}
</div>
</div>
</>}
{ playerteam!=='' && <>
<div className="w-full flex flex-row items-center gap-y-2 justify-end">
   <img src="Icons/digital-money.png" className="w-10 h-10"/>
     <p className="text-base font-bold text-slate-300">{purse}</p>
  </div>
{value.length>0 && value[index] &&
<>
<div className="w-full flex flex-col items-center gap-y-2 justify-center">
<img src={value[index].image} className="w-64 h-64"/>
 <div className="w-full flex flex-col items-center justify-center">
     <p className="text-base font-bold text-slate-300">{value[index].name}</p>
  <p className="text-base font-bold text-slate-300">Price-:{amount} lakhs</p>
   </div>
</div>
</>}
{turn!='' && <>
<div className="w-full flex flex-row items-center gap-x-2 my-6 justify-center">
   <img src={`Logos/${turn}.webp`} className="w-16 h-16"/>
     <p className="text-base font-bold text-slate-300">Bid-:{bid} lakhs</p>
</div>
</>}
{
  sold!='' && <>
    <div className="w-full flex flex-row items-center gap-x-2 my-6 justify-center">
     <p className="text-base font-bold text-slate-300">Sold to-: </p>
   <img src={`Logos/${sold}.webp`} className="w-16 h-16"/>
</div>
  </>
}
{ display===true && <>
<div className="w-full my-4 gap-x-4 flex items-center flex-row flex-wrap justify-center">
 <div className="p-2 rounded-full bg-slate-800 flex items-center justify-center" onClick={add}>
   <img src={`Logos/${playerteam}.webp`} className="w-14 h-14" />
 </div>
 {show===true &&
    <div className="p-4 rounded-full bg-slate-800 flex items-center justify-center" onClick={go}> 
       <img src={`Icons/dislike.png`} className="w-10 h-10" />
  </div>
 }
</div>
</>}
</>
}
{off===true && <>
  <div className="w-full my-4 flex items-center justify-center">
  {players.length<10 && <>
   <div className="rounded-lg p-2 w-24 bg-slate-800 flex items-center justify-center" onClick={next}>
  <button className="font-bold text-base text-slate-400">
    Next</button>
    </div>
    </>}
    {players.length>=10 && <> <div className="rounded-lg p-2 w-24 bg-slate-800 flex items-center justify-center" onClick={play}>
  <button className="font-bold text-base text-slate-400">
    Play</button>
    </div>
    </>}
    </div>
</>
}
{ players.length>0 && <>
     <div className="flex p-4 flex-row justify-center border-t border-slate-600 gap-4">
       <img src={`Logos/${playerteam}.webp`} className="w-16 h-16" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       players.map((i)=>{
         return(<>
      <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-sm font-bold">{i.name}</p>
  <p className="text-slate-400 text-sm font-bold">Bid-:{i.bid} lakhs</p>
           </div>
         </>)
       })
     }
     </div>
</>
}
{ computers.length>0 && <>
     <div className="flex p-4 flex-row justify-center border-t border-slate-600 gap-4">
       <img src={`Logos/${computerteam}.webp`} className="w-16 h-16" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       computers.map((i)=>{
         return(<>
      <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-sm font-bold">{i.name}</p>
  <p className="text-slate-400 text-sm font-bold">Bid-:{i.bid} lakhs</p>
           </div>
         </>)
       })
     }
     </div>
</>
}
  </>
}
{
  load===false && playing===true && <>
    <Toss player={players} computer={computers} playerteam={playerteam} computerteam={computerteam} />
  </>
}
  </>
  );
};


export default Auction;
