import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import {HashLink} from 'react-router-hash-link'
const TeamList = () => {
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const [load,setLoad]=useState(true);
 const [value,setValue]=useState([]);
const get_data=async()=>{
  const response=await fetch("https://prepared-josy-handcricket-0e7a326f.koyeb.app/");
  const item= await response.json();
  setValue(item.data)
  setLoad(false)
}
  useEffect(()=>{
    setLoad(true)
    get_data();
  },[])
  return (
    <>
  {load==true && <>
     <div className="w-full flex flex-col items-center justify-center py-40">
    <img src="Logos/Logo.webp" className="w-30 h-24" />
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
{ load===false && <>
  <div className="w-full bg-slate-800 border-b border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex ">
  <img className="w-28 h-16" src={`Logos/Logo.webp`} />
  <div className="w-full flex items-center justify-end">
<HashLink to='/auction'>
  <img src="Icons/auction.png" className="w-10 h-10" />
</HashLink>
</div>
</div>
<div className="w-full  flex flex-col justify-center">
  <div id='about' className="w-full py-2 my-4 flex-col flex justify-center border-b border-b-slate-400
  border-l-transparent border-r-transparent border-t-transparent items-center text-center">
    <h3 className="text-lg text-slate-400 font-bold">About</h3>
    <div className="w-full py-2 flex-row items-center flex-wrap flex text-center  justify-center"> <p className="text-xs text-slate-400 ml-2 mr-2 font-bold">The official IPL app is your go-to platform for tracking all the players in the Indian Premier League. This app offers an extensive list of all the players participating in the tournament, allowing fans to quickly find and explore their favourite stars.Whether you are looking for a specific player or just want to explore the talent in the IPL, the IPL app provides a simple and intuitive way to stay up-to-date with player information.
This version focuses purely on the display of player names, ideal for an app where the primary purpose is to showcase players.</p></div>
</div>
</div>
<div id="services" className="w-full mt-2 flex justify-center flex-col text-center">
     <h3 className="text-lg text-slate-400 font-bold">Services</h3>
    <div className="w-full mt-2 flex justify-center"><h1 className="text-green-400 text-2xl font-bold shadow-green-400">Select your Team</h1></div>
<div className="w-full mt-4 flex flex-wrap gap-x-6 gap-y-4 items-center justify-center border-b border-b-slate-400 p-2 flex-row ">
  {teams.map((i)=>{
  return(
  <div className="text-center rounded-lg  bg-slate-800">
    <Link  to={`/details?team=${i}`}>
    <img src={`Logos/${i}.webp`} className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">{i.toUpperCase()}</h4>
    </Link>
    </div>
    )
  })}
</div>
</div>
  <div id="gallery" className="w-full py-2 my-4 flex-col flex justify-center  items-center text-center p-2 gap-2">
    <h3 className="text-lg text-slate-400 font-bold">Gallery</h3>
    <div className="w-full  flex flex-wrap gap-x-6 gap-y-4 items-center justify-center  p-2 flex-row ">
  {new Array(8).fill("").map((i,ind)=>{
  return(
  <div className="text-center rounded-lg  bg-slate-800 transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <img src={`Gallery/pic${ind+3}.jpg`} className="w-36 h-24 rounded-md shadow-slate-800"></img>
    </div>
    )
  })}
</div>
    </div>
    <footer className="bg-black text-white">
      <div className="w-full flex justify-center  text-center flex-col p-4 mt-4">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-12">
    <HashLink smooth to='#about'> <li className="text-gray-400">
       About Us</li></HashLink>
     <HashLink smooth to='#services'> <li className="text-gray-400">Services</li></HashLink>
     <HashLink smooth to='#gallery'><li className="text-gray-400">Gallery</li></HashLink>
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
</>}
</>
  );
};



export default TeamList;
