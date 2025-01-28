import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
const Stats = () => {
  const [searchParams] = useSearchParams();
  const [load,setLoad]=useState(true);
  const [items,setItems]=useState([]);
  const teamId = searchParams.get("team"); 
  const get_Players=async()=>{
    const res=await fetch(`http://localhost:8000/players?team=${teamId}`)
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
  <h1 className="text-slate-400 text-2xl font-bold">Top Run Scorers</h1>
  </div>
  <div className="flex justify-center items-center flex-row flex-wrap gap-12 border-2 border-b-slate-400 p-2 border-t-transparent border-l-transparent border-r-transparent">
    {items.sort((a,b)=>b.runs-a.runs).map((i,ind)=>{
    if(ind<=4)
      return(<>
        <div className="text-center rounded-sm bg-black  transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex w-full justify-end">
      {i.role!=="Bowler" ? <img className="w-6 h-6" src={`Icons/${i.role}.png`} />:<img className="w-5 h-5" src={`Icons/${i.role}.png`} />}
    </div>
  <img className="w-36 h-36"src={i.image} />
   {i.captain===false &&  <p className=" my-2 text-sm font-bold text-slate-400">{i.name}</p>}
    {i.captain===true &&
      <p className=" my-2 text-sm font-bold text-slate-400">{i.name} (C)</p>
    }
        <p className="text-sm font-bold text-slate-400">Runs-: {i.runs}</p>
        </div>
      </>)
    })}
  </div>
    <div className="flex justify-center items-center py-4">
  <h1 className="text-slate-400 text-2xl font-bold">Top Wicket Takers</h1>
  </div>
  <div className="flex justify-center items-center flex-row flex-wrap gap-12  flex p-2 ">
    {items.sort((a,b)=>b.wickets-a.wickets).map((i,ind)=>{
    if(ind<=4)
      return(<>
        <div className="text-center rounded-sm bg-black  transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex w-full justify-end">
      {i.role!=="Bowler" ? <img className="w-6 h-6" src={`Icons/${i.role}.png`} />:<img className="w-5 h-5" src={`Icons/${i.role}.png`} />}
    </div>
  <img className="w-36 h-36"src={i.image} />
   {i.captain===false &&  <p className=" my-2 text-sm font-bold text-slate-400">{i.name}</p>}
    {i.captain===true &&
      <p className=" my-2 text-sm font-bold text-slate-400">{i.name} (C)</p>
    }
    <p className="text-sm font-bold text-slate-400">Wickets-: {i.wickets}</p>
        </div>
      </>)
    })}
  </div>
  </>}
  </>
  );
};


export default Stats;

