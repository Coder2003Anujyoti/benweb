import React,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import Site from "./Site.jsx";
const LocalPlayerTeam=()=>{
  const lists=localStorage.getItem('playerteam');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return "";
}
}
const LocalPlayers=()=>{
  const lists=localStorage.getItem('players');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalComputerTeam=()=>{
  const lists=localStorage.getItem('computerteam');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return "";
}
}
const LocalComputers=()=>{
  const lists=localStorage.getItem('computers');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const Auction = () => {
  const [retaincount,setRetaincount]=useState(0);
  const [toggle,setToggle]=useState(()=>LocalPlayerTeam()||"")
  const [load,setLoad]=useState(true);
  const [value,setValue]=useState([]);
  const [playerteam,setPlayerteam]=useState(()=>LocalPlayerTeam()||"");
  const [computerteam,setComputerteam]=useState(()=>LocalComputerTeam()||"");
  const [names,setNames]=useState([])
  const [show,setShow]=useState(true)
  const [amount,setAmount]=useState(0)
  const [bid,setBid]=useState(0);
  const [turn,setTurn]=useState("");
  const [display,setDisplay]=useState(true);
  const [sold,setSold]=useState("");
  const [off,setOff]=useState(false);
  const [index,setIndex]=useState(0);
  const [purse,setPurse]=useState(50000)
  const [players,setPlayers]=useState(()=>LocalPlayers()||[]);
  const [playing,setPlaying]=useState(false);
  const [computers,setComputers]=useState(()=>LocalComputers()||[])
  const [team,setTeam]=useState("");
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  useEffect(()=>{
  if(toggle==='' ){
    setPlaying(false)
  }
  else{
    setPlaying(true)
  }
},[toggle])
const localremove=()=>{
   localStorage.removeItem('players');
   localStorage.removeItem('computers');
   localStorage.removeItem('playerteam');
   localStorage.removeItem('computerteam');
   localStorage.removeItem('winarray');
   localStorage.removeItem('auctionmatch');
   window.location.reload();
   setPlaying(false);
   setPlayerteam("");
   setComputerteam("");
   setPlayers([]);
   setComputers([]);
   setLoad(true);
}
  const get_data=async()=>{
  const response=await fetch("https://intelligent-ailyn-handcricket-e8842259.koyeb.app/");
  const item= await response.json();
  setValue(item.data)
  setLoad(false)
  setAmount(Math.floor(Math.random()*100)+1)
  setIndex(Math.floor(Math.random()*item.data.length))
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
   if(bid!==0){
     if(computers.length<15){
       const store=value.find((i,ind)=>{
         return ind==index
       });
    setComputers([...computers,{name:store.name,image:store.image,bid:bid>0?bid:amount,matches:0,runs:0,wickets:0,team:computerteam}])
      setNames([...names,store.name])
      setSold(computerteam)
      setOff(true)
      setDisplay(false)
     }
     else{
    setComputers(computers);
      setOff(true)
      setDisplay(false)
     }
   }
   if(bid===0){
    if(computers.length<15){
    let rand_int=Math.floor(Math.random()*100);
    if(rand_int%2===0){
      const store=value.find((i,ind)=>{
      return ind==index
      });
    setComputers([...computers,{name:store.name,image:store.image,bid:bid>0?bid:amount,matches:0,runs:0,wickets:0,team:computerteam}])
      setNames([...names,store.name])
      setSold(computerteam)
      setOff(true)
      setDisplay(false)
    }
    else{
     setComputers(computers);
     setSold("Unsold")
      setOff(true)
      setDisplay(false)
    }
    }
    else{
     setComputers(computers);
     setSold("Unsold")
      setOff(true)
      setDisplay(false)
    }
   }
 }
 const next=()=>{
   if(sold!="Unsold"){
   const val=value.filter((i,ind)=>{
   return ind!=index
   });
   const len=val.length;
   setValue(val);
  setAmount(Math.floor(Math.random()*100)+1)
  setIndex(Math.floor(Math.random()*len))
  setOff(false);
  setShow(true)
  setDisplay(true)
  setBid(0);
  setTurn("")
  setSold("")
   }
   else{
     const len=value.length;
   setValue(value);
  setAmount(Math.floor(Math.random()*100)+1)
  setIndex((index+1)%len)
  setOff(false);
  setShow(true)
  setDisplay(true)
  setBid(0);
  setTurn("")
  setSold("")
   }
 }
 const play=()=>{
   window.scrollTo({ top: 0, behavior: "smooth" });
   if(computers.length<15){
   let r= value.slice().sort((a,b)=>(Math.random() > 0.5 ? a.name.localeCompare(b.name) :
  b.name.localeCompare(a.name))).map((i)=>{
         setComputers((prev)=>prev.length<15 && !names.includes(i.name)?[...prev,{name:i.name,image:i.image,bid:Math.floor(Math.random()*50)+1,matches:0,runs:0,wickets:0,team:computerteam}]:prev); 
    });
    setPlaying(true)
   }
   else{
     setPlaying(true);
   }
 }
 
 useEffect(()=>{
  if(turn!='' && computers.length<15){
  if(turn===playerteam){
    setTimeout(function() {
   let rand=Math.floor(Math.random()*100);
    if(rand%7==0){
    const store=value.find((i,ind)=>{
      return ind==index});
    setPlayers([...players,{name:store.name,image:store.image,bid:bid>0?bid:amount,matches:0,runs:0,wickets:0,team:playerteam}])
    setNames([...names,store.name])
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
 }
   if(turn!='' && computers.length===15){
  if(turn===playerteam){
    setTimeout(function() {
    const store=value.find((i,ind)=>{
      return ind==index});
    setPlayers([...players,{name:store.name,image:store.image,bid:bid>0?bid:amount,matches:0,runs:0,wickets:0,team:playerteam}])
    setNames([...names,store.name])
      setSold(playerteam);
      setPurse(purse-bid);
      setDisplay(false);
      setOff(true)
    },1000);
  }
   }
 },[turn])
  useEffect(()=>{
    get_data();
  },[])
  useEffect(()=>{
    if(playing===true){
      localStorage.setItem('players', 
      JSON.stringify(players));
      localStorage.setItem('computers',JSON.stringify(computers));
        localStorage.setItem('playerteam', 
      JSON.stringify(playerteam));
      localStorage.setItem('computerteam',JSON.stringify(computerteam));
    }
  },[playing])
  const make_team=()=>{
    const pl=value.filter((i)=>i.team===playerteam).map((i)=>{
      i.matches=0;
      i.runs=0;
      i.wickets=0;
      i.bid=-1;
      return {...i}
    })
    const co=value.filter((i)=>i.team===computerteam).map((i)=>{
      i.matches=0;
      i.runs=0;
      i.wickets=0;
      i.bid=-1;
      return {...i}
    })
    setPlayers(pl)
    setComputers(co)
    setPlaying(true)
    setRetaincount(3)
  }
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
    {playerteam==='' && computerteam=='' && <>
    <div className="w-full flex-col mt-2 flex text-center justify-center">
  <div className="w-full mt-2 flex justify-center">
 <h1 className="text-green-400 text-2xl font-bold shadow-green-400">Select your Team</h1></div>
<div className="w-full mt-4 flex flex-wrap gap-x-6 gap-y-4 items-center justify-center  p-2 flex-row">
  {teams.map((i)=>{
  return(
  <div className="text-center rounded-lg  bg-slate-800" onClick={()=>setPlayerteam(i)}>
    <img src={`Logos/${i}.webp`} className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">{i.toUpperCase()}</h4>
    </div>
    )
  })}
</div>
</div>
</>}
{playerteam!=='' && computerteam=='' && <>
    <div className="w-full flex-col mt-2 flex text-center justify-center">
  <div className="w-full mt-2 flex justify-center">
 <h1 className="text-green-400 text-2xl font-bold shadow-green-400">Select Computer Team</h1></div>
<div className="w-full mt-4 flex flex-wrap gap-x-6 gap-y-4 items-center justify-center  p-2 flex-row">
  {teams.map((i)=>{
  if(i!=playerteam)
  return(
  <div className="text-center rounded-lg  bg-slate-800" onClick={()=>setComputerteam(i)}>
    <img src={`Logos/${i}.webp`} className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">{i.toUpperCase()}</h4>
    </div>
    )
  })}
</div>
</div>
</>}
{
  playerteam!='' && computerteam!='' && retaincount===0  && <>
         <div className="flex p-4 my-24 flex-col justify-center items-center text-center gap-4">
     <h1 className="text-lg text-green-400 font-bold">Mode of Play</h1>
           <div className="w-full py-2 flex-row flex-wrap gap-x-8 flex justify-center items-center text-center">
    <div className="py-4 flex-col items-center flex-wrap flex  justify-center"><button onClick={make_team} className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg">Start Game</button></div>
        <div className="py-4 flex-col items-center flex-wrap flex  justify-center"><button onClick={()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
      setRetaincount(3)}} className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg">Auction Mode</button></div>
  </div>
    <h2 className="font-bold text-sm text-yellow-400">*In Start Game there is predefined set of players and you need not participate in auction.</h2>
   <h2 className="font-bold text-sm text-yellow-400">*In Auction Mode you need to buy players and you need to buy players from auction.</h2>
  </div>
  </>
}
{ playerteam!=='' && computerteam!='' && retaincount===3 && <>
<div className="w-full flex flex-row items-center gap-y-2 my-2 justify-end">
   <img src="Icons/digital-money.png" className="w-10 h-10"/>
     <p className="text-base font-bold text-slate-300">{purse.toLocaleString("en-IN")+""+"L"}</p>
  </div>
<div className="w-full flex flex-col items-center gap-y-2 justify-center">
  {value.map((i,ind)=>{
    if(ind===index){
      return(<>
        <img src={i.image} className="w-64 h-64"/>
 <div className="w-full flex flex-col items-center justify-center">
     <p className="text-base font-bold text-slate-300">{i.name}</p>
  <p className="text-base font-bold text-slate-300">Price-:{amount} lakhs</p>
   </div>
      </>)
    }
  })}
</div>
{turn!='' && <>
<div className="w-full flex flex-row items-center gap-x-2 my-6 justify-center">
   <img src={`Logos/${turn}.webp`} className="w-16 h-16"/>
     <p className="text-base font-bold text-slate-300">Bid-:{bid} lakhs</p>
</div>
</>}
{
  sold!='' && <>
    <div className="w-full flex flex-row items-center gap-x-2 my-6 justify-center">
  {sold!=="Unsold" && <>
     <p className="text-base font-bold text-slate-300">Sold to-: </p>
   <img src={`Logos/${sold}.webp`} className="w-16 h-16"/>
   </>}
   {sold==="Unsold" && <>
          <p className="text-base font-bold text-slate-300">Unsold</p>
   </>}
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
  <div className="w-full my-4 flex flex-row gap-x-8 items-center justify-center">
  {players.length<15 && <>
   <div className="rounded-lg p-2 w-24 bg-slate-800 flex items-center justify-center" onClick={next}>
  <button className="font-bold text-base text-slate-400">
    Next</button>
    </div>
    </>}
    {players.length===15 && <> <div className="rounded-lg p-2 w-24 bg-slate-800 flex items-center justify-center" onClick={play}>
  <button className="font-bold text-base text-slate-400">
    Play</button>
    </div>
    </>}
    </div>
</>
}
{ playerteam!='' && computerteam!='' && retaincount===3 &&  <>
  <div className="w-full flex my-16 gap-x-12 justify-center">
   <div className="p-2 w-30 rounded-full bg-slate-800 flex items-center justify-center" onClick={()=>setTeam(playerteam)}>
   <img src={`Logos/${playerteam}.webp`} className="w-14 h-14" />
 </div>
    <div className="p-2 w-30 rounded-full bg-slate-800 flex items-center justify-center" onClick={()=>setTeam(computerteam)}>
   <img src={`Logos/${computerteam}.webp`} className="w-14 h-14" />
 </div>
 </div>
 </>}
{ team===playerteam && team!='' && <>
     <div className="flex p-4 flex-row justify-center border-t border-slate-600 gap-4">
       <img src={`Logos/${playerteam}.webp`} className="w-16 h-16" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       players.map((i)=>{
         return(<>
      <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{i.name}</p>
           </div>
         </>)
       })
     }
     </div>
</>
}
{ team===computerteam && team!='' && <>
     <div className="flex p-4 flex-row justify-center border-t border-slate-600 gap-4">
       <img src={`Logos/${computerteam}.webp`} className="w-16 h-16" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       computers.map((i)=>{
         return(<>
      <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{i.name}</p>
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
    <Site player={players} computer={computers} playerteam={playerteam} computerteam={computerteam} remove={localremove} />
  </>
}
  </>
  );
};


export default Auction;