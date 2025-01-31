import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
const History = () => {
  const [searchParams] = useSearchParams();
  const [items,setItems]=useState([]);
  const [load,setLoad]=useState(true);
  const teamId = searchParams.get("team"); 
  const get_Details=async()=>{
    const res=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/details?team=${teamId}`)
    var data=await res.json();
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
  <div className="w-full flex flex-col">
    <div className="w-full py-8 flex-col flex justify-center items-center text-center"><img src={`Logos/${teamId}.webp`} 
    className="w-36 h-36"/>
  <div className="w-full  flex-row flex justify-center"><p className="text-xl text-slate-400 font-bold">{items[0].team}</p></div>
  {items[0].trophies>0 && <div className="w-full  flex-row flex justify-center gap-2 p-2">{new Array(items[0].trophies).fill(1).map((i)=>{
      return(<>
        <img src="Icons/trophy.png" className="w-8 h-8" />
      </>)
    })}
    </div>}
   <div className="w-full py-2 flex-col items-center flex-wrap flex gap-2  justify-center"><p className="text-xl text-slate-400 font-bold">Matches-: {items[0].matches}</p>
   <p className="text-xl text-slate-400 font-bold">Win-: {items[0].win}</p>
      <p className="text-xl text-slate-400 font-bold">Lose-: {items[0].lose}</p>
    {items[0].win>0 &&   <p className="text-xl text-slate-400 font-bold">Win-Ratio-: {parseInt(items[0].win/items[0].matches)*100}%</p>}
    {items[0].win==0 &&   <p className="text-xl text-slate-400 font-bold">Win-Ratio-: 0%</p>}
   </div>
  <div className="w-full py-2 flex-col flex justify-center items-center text-center">
    <h3 className="text-2xl text-slate-400 font-bold">About</h3>
    <div className="w-full py-2 flex-row items-center flex-wrap flex text-center  justify-center"> <p className="text-sm text-slate-400 font-bold">{items[0].about}</p></div>
  </div>
    <div className="w-full py-2 flex-col flex justify-center items-center text-center">
    <div className="w-full py-2 flex-col items-center flex-wrap flex  justify-center"> <a href={items[0].site} target="_blank"><button className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-md">Official Site</button></a></div>
  </div>
  
        </div>
        </div>
  </>
}
    </>
  );
};


export default History;

