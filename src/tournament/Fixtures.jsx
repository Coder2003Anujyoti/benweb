import React,{useEffect} from "react";
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link'
const Fixtures = () => {
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = JSON.parse(decodeURIComponent(queryParams.get("data"))) || [];
    useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  return (
   <>
    <div className="w-full bg-slate-800 p-1 flex ">
  <img className="w-24 h-24" src="Icons/stadium.png"/>
</div>
<div className="w-full flex flex-row py-6 justify-center gap-12">
   <div className="w-full flex  justify-center  gap-12" >

       <div className="flex w-16 justify-center items-center border-b-2 border-b-slate-400"> <p className="text-sm font-bold text-slate-400">Player</p></div>
      <div className="flex w-24  justify-center items-center border-b-2 border-b-slate-400 "><p className="text-sm font-bold text-slate-400">Computer</p></div>
    <div className="flex w-16 justify-center items-center border-b-2 border-b-slate-400"> <p className="text-sm font-bold text-slate-400">Winner</p></div>
   </div>
   </div>
  <div className="w-full flex flex-row flex-wrap justify-center items-center my-4 gap-y-8">
    {data.map((i,ind)=>{
      return(<>
    <div className="w-full  flex flex-row flex-wrap justify-center items-center gap-x-16 border-b border-b-slate-400 p-5">

      <div className="w-16 flex text-center justify-center items-center">   <img src={`Logos/${i.player}.webp`} className="w-16 h-16" /></div>
      <div className="w-16 flex text-center justify-center items-center">   <img src={`Logos/${i.computer}.webp`} className="w-16 h-16" /></div>
      <div className="w-16 flex text-center justify-center items-center">   <img src={`Logos/${i.win}.webp`} className="w-16 h-16" /></div>
      </div>
      </>)
    })}
  </div>
      <footer className="bg-black text-white">
      <div className="w-full flex justify-center  text-center flex-col p-4 mt-4">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-7">
    <HashLink smooth to='/#about'> <li className="text-gray-400">
       About Us</li></HashLink>
     <HashLink smooth to='/#services'> <li className="text-gray-400">Services</li></HashLink>
    <HashLink smooth to='/#modes'><li className="text-gray-400">Modes</li></HashLink>
     <HashLink smooth to='/#gallery'><li className="text-gray-400">Gallery</li></HashLink>
        </ul>
     </div>
      <div className="w-full flex justify-center  text-center flex-col mt-4">
        <h2 className="text-xl font-semibold">Teams</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-6 gap-y-4">
        {teams.map((i)=>{
          return(<>
         <Link to={`/history?team=${i}`}><li><img className="w-12 h-12" src={`Logos/${i}.webp`}/></li></Link>
          </>)
        })}
        </ul>
      </div>
            <div className="w-full flex justify-center gap-y-2  text-center flex-col p-4 mt-4">
    <h2 className="text-xl font-semibold">Sponsors</h2>
    <div className="mt-4 flex flex-row flex-wrap justify-center gap-x-6 gap-y-4 ">
  {new Array(4).fill("").map((i,ind)=>{
  return(
  <div className="text-center">
    <img src={`sponsor/sponsor${ind+1}.png`} className="w-22 h-12"></img>
    </div>
    )
  })}
</div>
    </div>
    <div class="border-t border-gray-700 mt-4 p-2 text-center text-gray-400">
      © 2025 Coder2003Anujyoti All rights reserved.
    </div>
</footer>
   </>
  );
};



export default Fixtures;
