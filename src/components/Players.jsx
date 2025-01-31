import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
const Players = () => {
  const [searchParams] = useSearchParams();
  const [load,setLoad]=useState(true);
  const [items,setItems]=useState([]);
  const teamId = searchParams.get("team"); 
  const get_Players=async()=>{
    const res=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/players?team=${teamId}`)
    const data=await res.json();
    setItems(data);
    setLoad(false);
  }
  useEffect(()=>{
    get_Players();
  },[])
  return (
    <>
      <div className="w-full bg-slate-800 border-2 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex ">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
</div>
{
  load==true && <>
      <div className="flex justify-center items-center py-60">
  <h1 className="text-slate-400 text-2xl font-bold">Loading...</h1>
</div>
  </>
}
{load==false && <>
  <div className="flex justify-center items-center py-4">
  <h1 className="text-slate-400 text-2xl font-bold">Batters</h1>
  </div>
  <div className="flex justify-center items-center flex-row flex-wrap gap-12 border-2 border-b-slate-400 p-2 border-t-transparent border-l-transparent border-r-transparent">
    {items.map((i)=>{
    if(i.role=="Batsman" || i.role=="Wicket-Keeper")
      return(<>
        <div className="text-center rounded-sm bg-black  transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex w-full justify-end"><img className="w-6 h-6" src={`Icons/${i.role}.png`} />
    </div>
    <div className="flex justify-center items-center"> <img className="w-36 h-36"src={i.image} /></div>
   <div className="flex flex-col text-center my-2">
   {i.captain===false &&  <p className="text-sm font-bold text-slate-400">{i.name}</p>}
    {i.captain===true &&
      <p className="text-sm font-bold text-slate-400">{i.name} (C)</p>
    }
   <p className="text-sm font-bold text-slate-400">Runs-: {i.runs}</p>
  <p className="text-sm font-bold text-slate-400">Wickets-: {i.wickets}</p>
  </div>
        </div>
      </>)
    })}
  </div>
    <div className="flex justify-center items-center py-4">
  <h1 className="text-slate-400 text-2xl font-bold">All-Rounders</h1>
  </div>
  <div className="flex justify-center items-center flex-row flex-wrap gap-12 border-2 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex p-2 ">
    {items.map((i)=>{
    if(i.role=="All-rounder")
      return(<>
        <div className="text-center rounded-sm bg-black  transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex w-full justify-end"><img className="w-6 h-6" src={`Icons/${i.role}.png`} />
    </div>
     <div className="flex justify-center items-center"> <img className="w-36 h-36"src={i.image} /></div>
   <div className="flex flex-col text-center my-2">
   {i.captain===false &&  <p className="text-sm font-bold text-slate-400">{i.name}</p>}
    {i.captain===true &&
      <p className="text-sm font-bold text-slate-400">{i.name} (C)</p>
    }
    <p className="text-sm font-bold text-slate-400">Runs-: {i.runs}</p>
       <p className="text-sm font-bold text-slate-400">Wickets-: {i.wickets}</p>
        </div>
        </div>
      </>)
    })}
  </div>
    <div className="flex justify-center items-center py-4">
  <h1 className="text-slate-400 text-2xl font-bold">Bowlers</h1>
  </div>
  <div className="flex justify-center items-center flex-row flex-wrap gap-12">
    {items.map((i)=>{
    if(i.role=="Bowler")
      return(<>
        <div className="text-center rounded-sm bg-black  transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex w-full justify-end"><img className="w-5 h-5" src={`Icons/${i.role}.png`} />
    </div>
     <div className="flex justify-center items-center"> <img className="w-36 h-36"src={i.image} /></div>
   <div className="flex flex-col text-center my-2">
   {i.captain===false &&  <p className="text-sm font-bold text-slate-400">{i.name}</p>}
    {i.captain===true &&
      <p className="text-sm font-bold text-slate-400">{i.name} (C)</p>
    }
       <p className="text-sm font-bold text-slate-400">Runs-: {i.runs}</p>
       <p className="text-sm font-bold text-slate-400">Wickets-: {i.wickets}</p>
        </div>
        </div>
      </>)
    })}
  </div>
</>}
    </>
  );
};


export default Players;
