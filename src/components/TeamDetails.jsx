import React,{useEffect,useState} from "react";
import {HashLink} from 'react-router-hash-link'
import {useSearchParams,Link} from "react-router-dom"
const TeamDetails = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("team"); 
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const [load,setLoad]=useState(true);
    const [item,setItem]=useState([]);
  const get_data=async()=>{
    const response=await fetch('https://prepared-josy-handcricket-0e7a326f.koyeb.app/');
    const data=await response.json();
    setItem(data.data);
    setLoad(false);
  }
  useEffect(()=>{
    setLoad(true);
    get_data();
  },[])
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
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
{load==false && <>
    <div className="w-full bg-slate-800 border-b border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex ">
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
  <div className="w-full py-4 flex justify-center">
    <h1 className="text-xl font-extrabold text-slate-400">Top Batters</h1>
  </div>
  <div className="w-full flex flex-col justify-center gap-4 ">
    
    {
      item.sort((a,b)=>b.runs-a.runs).map((i,ind)=>{
      if(ind<=2)
        return(<>
 <div className="w-full flex flex-row flex-wrap justify-evenly border-b p-4 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent">
 <Link to={`/profile?name=${i.name}&team=${i.team}`}>
   <img src={i.image} className="w-20 h-20"/>
   </Link>
  <div className="flex justify-center items-center"><h2 className="text-sm font-extrabold text-slate-400 ">{i.name}</h2></div>
    <div className="flex justify-center items-center"> <h2 className="text-sm font-extrabold text-slate-400 ">Runs-:{i.runs}</h2></div>
   </div>
        </>)
      })
    }
    </div>
    <div className="w-full py-8 flex justify-center">
    <h1 className="text-xl font-extrabold text-slate-400">Top Bowlers</h1>
  </div>
  <div className="w-full flex flex-col justify-center gap-4 ">
    {
      item.sort((a,b)=>b.wickets-a.wickets).map((i,ind)=>{
      if(ind<=2)
        return(<>
 <div className="w-full flex flex-row flex-wrap justify-evenly border-b p-4 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent">
      <Link to={`/profile?name=${i.name}&team=${i.team}`}>
   <img src={i.image} className="w-20 h-20"/>
   </Link>
  <div className="flex justify-center items-center"><h2 className="text-sm font-extrabold text-slate-400 ">{i.name}</h2></div>
    <div className="flex justify-center items-center"> <h2 className="text-sm font-extrabold text-slate-400 ">Wickets-:{i.wickets}</h2></div>
   </div>
        </>)
      })
    }
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
</>}
</>
  );
};



export default TeamDetails;
