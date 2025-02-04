import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
const Card = () => {
  const [searchParams] = useSearchParams();
  const [load,setLoad]=useState(true);
  const [items,setItems]=useState([]);
  const teamId = searchParams.get("team"); 
  const team = searchParams.get("name");
  const get_Player=async()=>{
    const res=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/names?team=${team}`)
    const data=await res.json();
    setLoad(false);
    setItems(data);
  }
  useEffect(()=>{
    get_Player();
  },[])
  return (
    <>
         <div className="w-full bg-slate-800 border-2 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex ">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
  </div>
{
  load==true && <>
      <div className="flex justify-center items-center py-60">
  <h1 className="text-slate-400 text-xl font-bold">Loading...</h1>
</div>
  </>
}
{
  load==false &&
  <>
  <div className="w-full flex flex-col justify-center items-center gap-y-4">
  <div className="w-full flex flex-row justify-center items-center">
  <div className="flex justify-center items-center">
    <img src={items[0].image} className="w-64 h-64" />
    </div>
    </div>
      <div className="w-full  flex flex-col flex-wrap justify-center items-center">
      <div className="text-center flex flex-row justify-center items-center">
   {items[0].captain==false && <h1 className="text-lg font-bold text-slate-400">Name-: {items[0].name} </h1>}
      {items[0].captain==true && <h1 className="text-lg font-bold text-slate-400">Name-: {items[0].name} (C)</h1>}
  </div>
        <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Role-: {items[0].role}</h1>
  </div>
          <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Matches-: {items[0].matches}</h1>
  </div>
  <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Runs-: {items[0].runs}</h1>
  </div>
        <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Wickets-: {items[0].wickets}</h1>
  </div>
  </div>
  <div className="text-center flex flex-row justify-center items-center">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
  </div>
  </div>
  </>
}
</>
  )
};

export default Card;
