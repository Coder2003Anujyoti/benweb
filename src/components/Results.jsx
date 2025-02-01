import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
const Results = () => {
  const [searchParams] = useSearchParams();
  const [items,setItems]=useState([]);
  const [load,setLoad]=useState(true);
  const [loads,setLoads]=useState(false);
  const [length,setLength]=useState(0);
  const [offset,setOffset]=useState(0);
  const teamId = searchParams.get("team"); 
  const get_Details=async()=>{
    const res=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/results?team=${teamId}&offset=${offset}&limit=5`)
    const data=await res.json();
    setItems([...items,data.data]);
    setLoad(false);
    setLoads(false);
   setLength(data.length)
  }
  const go=()=>{
    setOffset(offset+5);
    setLoads(true)
  }
  useEffect(()=>{
    get_Details();
  },[offset])
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
    load==false && length===0 && <>
      <div className="flex justify-center items-center py-60">
  <h1 className="text-slate-400 text-xl font-bold">No Matches</h1>
</div>
  </>
}
{
  load==false && length>0 && <>
  <div className="w-full flex flex-col justify-center">
     <div className="flex justify-center items-center py-8"><h1 className="text-lg text-slate-400 font-bold">Match Results</h1></div>
   <div className="w-full flex flex-col justify-center gap-12">
    {items.map((item,ind)=>{
      return(<>
        {item.map((i)=>{return(<>
  <div className="w-full flex flex-row justify-center gap-16 py-2 border-b-2 border-b-slate-400">
    <img src={`Logos/${teamId}.webp`} className="w-16 h-16"/>
    <div className="flex justify-center items-center"><h1 className="text-base text-yellow-400 font-bold">{i.status}</h1></div>
   <img src={`Logos/${i.name}.webp`} className="w-16 h-16" />
         </div>
        </>)})}
         {ind===items.length-1 && loads==false && offset<length-5 &&
        <div className="w-full flex justify-center">
        <button className="p-4 font-bold text-sm text-slate-400 bg-slate-800 rounded-lg" onClick={go}>More Items</button>
      </div>}
     {loads==true && <div className="flex items-center justify-center text-center text-slate-400 text-base font-bold"><p>Items are loading...</p></div> }
      </>)
    })}
  </div>
  </div>
    </>
}

    </>
  );
};


export default Results;

