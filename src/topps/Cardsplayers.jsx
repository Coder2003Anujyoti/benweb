import React,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import {useSearchParams,Link} from "react-router-dom"
const Cardsplayers = () => {
  const [searchParams] = useSearchParams();
  const [load,setLoad]=useState(true);
  const [items,setItems]=useState([]);
  const teamId = searchParams.get("team"); 
  const teams=["CSK","DD","KKR","MI","RCB","SRH","RR","KXIP","PWI"];
  const get_data=async()=>{
    const response=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/card?team=${teamId}`);
    const data=await response.json();
    setLoad(false);
    setItems(data);
  }
  useEffect(()=>{
  window.scrollTo({ top: 0, behavior: "smooth" });
    get_data()
  },[teamId])
  return (
   <>
      {
    load===true && <>
           <div className="w-full flex flex-col items-center justify-center py-40">
    <img src="Logos/Logo.svg" className="w-32 h-24" />
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
    </>
  }
  {load==false && <>
     <div className="w-full bg-white border-b border-b-slate-800 flex items-center justify-center">
    <img src={`Logos/${teamId}.png`} className="w-auto h-16"/>
     </div>
   <div className="w-full bg-white p-2 flex flex-wrap gap-x-2 gap-y-2 items-center justify-center flex-row">
 {items.map((i)=>{
   return(<>
     <div className="flex p-2 flex-col text-center transition duration-300 ease-in-out transform  hover:scale-105">
    <div className="w-full flex text-center justify-center"><img src={i.image} className="w-36 h-auto" /></div>
       <p className="w-full bg-slate-600 text-xs font-bold text-white">{i.name}</p>
     </div>
   </>)
 })}
</div>
  <footer className="bg-slate-200 p-2 text-black">
      <div className="w-full flex justify-around text-center flex-row flex-wrap">
        <p className="mt-2 ml-2 mr-2 text-slate-800 text-sm font-bold">Cricket Attax 2013, a Topps trading card game, featured real cricketers, player stats, and competitive gameplay for fans.</p>
      </div>
      <div className="w-full flex justify-center  text-center flex-col mt-4">
        <h2 className="text-lg font-bold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap text-sm justify-center gap-x-12">
    <HashLink smooth to='/home#about'> <li className="text-slate-800 font-bold">
       About Us</li></HashLink>
     <HashLink smooth to='/home#services'> <li className="text-slate-800 font-bold">Services</li></HashLink>
     <HashLink smooth to='/home#gallery'><li className="text-slate-800 font-bold">Gallery</li></HashLink>
        </ul>
     </div>
      <div className="w-full flex justify-center  text-center flex-col mt-4">
        <h2 className="text-lg font-semibold">Teams</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-6 gap-y-4">
        {teams.map((i)=>{
          return(<>
<li> <HashLink smooth to={`/cardsplayers?team=${i}`}><img className="w-auto h-10" src={`Logos/${i}.png`}/></HashLink></li>
          </>)
        })}
        </ul>
      </div>
    <div class="border-t border-gray-700 mt-4 p-2 text-center font-bold text-slate-800 text-sm">
      © 2025 Coder2003Anujyoti All rights reserved.
    </div>
</footer>
     </>}
   </>
  );
};
export default Cardsplayers;
