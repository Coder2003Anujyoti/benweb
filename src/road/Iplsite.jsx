import React,{useState,useEffect} from "react";
import Site from "./Site.jsx";
const LocalData=()=>{
  const lists=localStorage.getItem('iplteams');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const Localget=()=>{
  const lists=localStorage.getItem('iplplayerteam');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return "";
}
}
const Iplsite = () => {
  const [load,setLoad]=useState(true);
  const [value,setValue]=useState(()=>LocalData()||[]);
  const [playerteam,setPlayerteam]=useState(()=>Localget()||"");
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const get_data=async()=>{
  if(playerteam===""){
  const response=await fetch("https://intelligent-ailyn-handcricket-e8842259.koyeb.app/");
  const item= await response.json();
  const updated=item.data.map((i)=>{
    i.runs=0;
    i.wickets=0;
    return {...i}
  })
  setValue(updated)
  setLoad(false)
  }
  else{
    const response=await fetch("https://intelligent-ailyn-handcricket-e8842259.koyeb.app/");
  const item= await response.json();
  setLoad(false)
  }
}
useEffect(()=>{
  get_data();
},[])
const sets=(i)=>{
  setPlayerteam(i);
}
const localremove=()=>{
   localStorage.removeItem('iplteams');
   localStorage.removeItem('iplplayerteam');
   localStorage.removeItem('iploppos');
   localStorage.removeItem('iplwinlist');
   localStorage.removeItem('iplwinnerlist');
   window.location.reload();
   setPlayerteam("")
   setValue([]);
   setLoad(true);
 }
useEffect(()=>{
  if(playerteam!==''){
    localStorage.setItem('iplteams', 
      JSON.stringify(value));
      localStorage.setItem('iplplayerteam',JSON.stringify(playerteam));
  }
},[playerteam])
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
    load===false && playerteam==='' && <>
          <div className="w-full flex-col mt-2 flex text-center justify-center">
  <div className="w-full mt-2 flex justify-center">
 <h1 className="text-green-400 text-2xl font-bold shadow-green-400">Select your Team</h1></div>
<div className="w-full mt-4 flex flex-wrap gap-x-6 gap-y-4 items-center justify-center  p-2 flex-row">
  {teams.map((i)=>{
  return(
  <div className="text-center rounded-lg  bg-slate-800" onClick={()=>sets(i)}>
    <img src={`Logos/${i}.webp`} className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">{i.toUpperCase()}</h4>
    </div>
    )
  })}
</div>
</div>
    </>
  }
    {
    load===false && playerteam!=='' && <>
      <Site store={value} localremove={localremove} playerteam={playerteam} />
      </>
    }
  </>
  );
};



export default Iplsite;
