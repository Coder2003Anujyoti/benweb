import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
const Standings = () => {
  const [searchParams] = useSearchParams();
  const [items,setItems]=useState([]);
  const [load,setLoad]=useState(true);
  const teamId = searchParams.get("team"); 
  const get_Details=async()=>{
    const res=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/standings`)
    const data=await res.json();
    setItems(data);
    setLoad(false);
  }
  useEffect(()=>{
    get_Details();
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
{
  load===false && <>
  <div className="w-full flex flex-row py-6 justify-center gap-12">
   <div className="w-full flex  justify-center  gap-12" >

       <div className="flex w-16 justify-center items-center border-b-2 border-b-slate-400"> <p className="text-sm font-bold text-slate-400"> Logo </p></div>
      <div className="flex w-24  justify-center items-center border-b-2 border-b-slate-400 "><p className="text-sm font-bold text-slate-400">Name</p></div>
    <div className="flex w-16 justify-center items-center border-b-2 border-b-slate-400"> <p className="text-sm font-bold text-slate-400">Win-ratio </p></div>
   </div>
   </div>
  <div className="w-full flex flex-row flex-wrap justify-center gap-y-8">
    {items.sort((a,b)=>b.win-a.win).map((i,ind)=>{
      return(<>
    <div className="w-full  flex flex-row flex-wrap justify-center p-2 gap-x-16 border-b-2 border-b-slate-400">

      <div className="w-16 flex text-center justify-center items-center">   <img src={`Logos/${i.teamid}.webp`} className="w-12 h-12" /></div>
  <div className="flex w-16 justify-center items-center"> <p className="text-sm font-bold text-slate-400">{i.teamid.toUpperCase()}</p></div>
   {i.win>0 && <div className="flex w-20 justify-center items-center"> <p className="text-sm font-bold text-slate-400">{(i.win/i.matches).toFixed(2)*100}%</p></div>}
      {i.win==0 && <div className="flex w-16 justify-center items-center"> <p className="text-sm font-bold text-slate-400">0%</p></div>}
      </div>
      </>)
    })}
  </div>
      
  </>
}
    </>
  );
};


export default Standings;


