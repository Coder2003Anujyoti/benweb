import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link'
const Site = ({player,computer,playerteam,computerteam,remove}) => {
  const [team,setTeam]=useState(playerteam);
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const details=player.concat(computer);
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  return (
   <>
     <div className="w-full bg-slate-800 p-2 flex ">
  <img className="w-16 h-16" src="Icons/auction.png"/>
</div>

     <div className="w-full my-16 flex flex-wrap gap-x-12 gap-y-12 items-center justify-center flex-row  p-2">
      <HashLink to={`/playgame?player=${encodeURIComponent(JSON.stringify(player))}&&computer=${encodeURIComponent(JSON.stringify(computer))}&&playerteam=${encodeURIComponent(JSON.stringify(playerteam))}&&computerteam=${encodeURIComponent(JSON.stringify(computerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/crickets.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Play</h4>
    </div>
    </HashLink>
          <HashLink to={`/tourstats?player=${encodeURIComponent(JSON.stringify(player))}&&computer=${encodeURIComponent(JSON.stringify(computer))}&&playerteam=${encodeURIComponent(JSON.stringify(playerteam))}&&computerteam=${encodeURIComponent(JSON.stringify(computerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/stats.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Stats</h4>
    </div>
    </HashLink>
    </div>
  <div className="w-full flex gap-x-12 justify-center">
   <div className="p-2 w-30 rounded-full bg-slate-800 flex items-center justify-center" onClick={()=>setTeam(playerteam)}>
   <img src={`Logos/${playerteam}.webp`} className="w-16 h-16" />
 </div>
    <div className="p-2 w-30 rounded-full bg-slate-800 flex items-center justify-center" onClick={()=>setTeam(computerteam)}>
   <img src={`Logos/${computerteam}.webp`} className="w-16 h-16" />
 </div>
 </div>
 {team!='' && <>
       <div className="flex p-4 flex-col justify-center items-center text-center border-t border-slate-600 gap-4 my-6">
      {team===playerteam && <h1 className="text-lg text-green-400 font-bold">Your Team</h1>}
     {team===computerteam && <h1 className="text-lg text-green-400 font-bold">Opposition Team</h1>}
       <img src={`Logos/${team}.webp`} className="w-24 h-24" />
     </div>
   <div className="w-full flex p-1 flex-wrap flex-row justify-center gap-2">
     {
       details.map((it)=>{
       if(it.team===team)
        return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={it.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{it.name}</p>
           </div>
          
         </>)
       })
     }
     </div>
     </>}
    <div className="w-full py-2 my-8 flex-col flex justify-center items-center text-center">
    <div className="w-full py-4 flex-col items-center flex-wrap flex  justify-center"><button onClick={remove} className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg">New Team</button></div>
  </div>
      <footer className="bg-black text-white">
      <div className="w-full flex justify-center  text-center flex-col p-4 mt-4">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-12">
    <HashLink smooth to='/#about'> <li className="text-gray-400">
       About Us</li></HashLink>
     <HashLink smooth to='/#services'> <li className="text-gray-400">Services</li></HashLink>
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


export default Site;
