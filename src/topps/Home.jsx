import React, { useEffect, useState } from 'react';
import {HashLink} from 'react-router-hash-link'
const Home = () => {
  const [load,setLoad]=useState(true);
  const teams=["CSK","DD","KKR","MI","RCB","SRH","RR","KXIP","PWI"];
  const get_data=async()=>{
    const response=await fetch('https://prepared-josy-handcricket-0e7a326f.koyeb.app/cards');
    const data=await response.json();
     setLoad(false);
  }
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
    get_data()
  },[])
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
  {load===false && <>
<div className="w-full p-2 flex justify-start bg-white border-b border-b-black">
  <img src='Logos/Logo.svg' className="w-18 h-18"/>
</div>
<div id="about" className="flex w-full bg-white flex-col text-center">
 <div className="flex w-full items-center justify-center"> <h1 className="my-2 text-lg font-bold">About</h1></div>
  <div className="flex w-full justify-center">
    <p className="ml-2 mr-2 text-xs font-bold">Cricket Attax 2013 was a trading card game released by Topps, featuring cricket players from the 2013 season. It was part of the Cricket Attax series, which allowed fans to collect, trade, and play with cards representing real cricketers. The game included various types of cards such as batsmen, bowlers, all-rounders, and special edition cards with unique attributes like power plays and team boosts. Each card had stats like batting, bowling, and fielding skills, which players used to compete in simulated matches. The game was popular among cricket fans, especially in countries where the sport had a strong following.</p>
    </div>
</div>
<div id="services" className="flex w-full bg-white flex-col text-center py-2">
 <div className="flex w-full flex-col justify-center gap-y-4"> <h1 className="text-lg font-bold">Services</h1>
 <h1 className=" text-sm font-bold">Select Your Team</h1>
  <div className="flex gap-6 w-full flex-row flex-wrap justify-center"> 
  {teams.map((i)=>{
    return(<>
    <HashLink to={`/cardsplayers?team=${i}`}>
      <div className="p-2  rounded-lg bg-white text-center transition duration-300 ease-in-out transform  hover:scale-105">
        <img src={`Logos/${i}.png`} className="w-auto h-14" />
      <p className="text-xs font-bold text-black">{i}</p>
      </div>
      </HashLink>
    </>)
  })}
  </div>
 </div>
 </div>
 <div className="w-full bg-white flex flex-col py-2 text-center">
    <div id="gallery" className="flex w-full flex-col bg-white justify-center gap-y-4"> <h1 className="text-lg font-bold">Gallery</h1>
    </div>
      <div className="flex my-4 gap-2 w-full flex-row flex-wrap justify-center"> 
  {new Array(4).fill("").map((i,ind)=>{
    return(<>
      <div className="p-2 rounded-lg bg-white text-center transition duration-300 ease-in-out transform  hover:scale-105">
        <img src={`Gallery/${ind+1}.jpg`} className="w-28 h-20  rounded-md" />
              </div>
    </>)
  })}
  </div>
 </div>
  <footer className="bg-slate-200 py-2 text-black">
      <div className="w-full flex justify-around text-center flex-row flex-wrap">
        <p className="mt-2 ml-2 mr-2 text-slate-800 text-sm font-bold">Cricket Attax 2013, a Topps trading card game, featured real cricketers, player stats, and competitive gameplay for fans.</p>
      </div>
      <div className="w-full flex justify-center  text-center flex-col mt-4">
        <h2 className="text-lg font-bold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap text-sm justify-center gap-x-12">
    <HashLink smooth to='#about'> <li className="text-slate-800 font-bold">
       About Us</li></HashLink>
     <HashLink smooth to='#services'> <li className="text-slate-800 font-bold">Services</li></HashLink>
     <HashLink smooth to='#gallery'><li className="text-slate-800 font-bold">Gallery</li></HashLink>
        </ul>
     </div>
      <div className="w-full flex justify-center  text-center flex-col mt-4">
        <h2 className="text-lg font-semibold">Teams</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-6 gap-y-4">
        {teams.map((i)=>{
          return(<>
<li><img className="w-auto h-10" src={`Logos/${i}.png`}/></li>
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

export default Home;
