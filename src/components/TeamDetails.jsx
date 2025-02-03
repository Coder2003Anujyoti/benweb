import React from "react";
import {HashLink} from 'react-router-hash-link'
import {useSearchParams,Link} from "react-router-dom"
const TeamDetails = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("team"); 
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  return (
    <>
<div className="w-full bg-slate-800 border-2 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex ">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
</div>
<div className="w-full my-16 flex flex-wrap gap-x-12 gap-y-12 items-center justify-center flex-row">
    <Link to={`/play?team=${teamId}`} >
    <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/crickets.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Play</h4>
    </div>
  </Link>
  <Link to={`/players?team=${teamId}`} >
    <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/player.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Players</h4>
    </div>
    </Link>
      <Link to={`/stats?team=${teamId}`} >
        <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/analysis.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Stats</h4>
    </div>
    </Link>
  <Link to={`/history?team=${teamId}`} >
        <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/history.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">About</h4>
    </div>
    </Link>
    <Link to={`/standings?team=${teamId}`} >
        <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/podium.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Standings</h4>
    </div>
    </Link>
      <Link to={`/results?team=${teamId}`} >
        <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/results.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Results</h4>
    </div>
    </Link>
</div>
    <footer className="bg-black text-white">
      <div className="w-full flex justify-around text-center flex-row flex-wrap">
        <p className="mt-2 ml-2 mr-2 text-gray-400">Explore team rosters, player stats, and dive deep into the rich history of IPL.Thank you for being part of the IPL family—let the game begin!</p>
      </div>
      <div className="w-full flex justify-center  text-center flex-col mt-4">
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
    <div class="border-t border-gray-700 mt-4 p-2 text-center text-gray-400">
      © 2025 Coder2003Anujyoti All rights reserved.
    </div>
</footer>
</>
  );
};



export default TeamDetails;
