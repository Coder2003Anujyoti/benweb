import React,{useState} from "react";
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link'
const LocalData=()=>{
  const lists=localStorage.getItem('winlist');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const Site = ({playerteam,store,localremove}) => {
  const [stores,setStores]=useState(store);
  const [win,setWin]=useState(()=>LocalData()||[])
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const winners=win.filter((i)=>i.win===playerteam);
  const losers=win.filter((i)=>i.win!==playerteam);
  return (
   <>
     <div className="w-full bg-slate-800 p-1 flex ">
  <img className="w-24 h-24" src="Icons/stadium.png"/>
</div>
{win.length<9 && <>
     <div className="w-full my-16 flex flex-wrap gap-x-12 gap-y-12 items-center justify-center flex-row  p-2">
     <HashLink to={`/game?data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/crickets.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Play</h4>
    </div>
    </HashLink>
         <HashLink to={`/team?data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/team.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Teams</h4>
    </div>
    </HashLink>
         <HashLink to={`/fixtures?data=${encodeURIComponent(JSON.stringify(win))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/tournament.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Fixtures</h4>
    </div>
    </HashLink>
    </div>
    </>}
  {
    win.length===9 && <>
      {winners.length>=5 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 py-6">
         <div className="w-full flex justify-center"><img className="w-36 h-36" src="Icons/trophy.png" /></div>
          <h1 className="font-bold text-yellow-500">Champions</h1>
        </div>
      </>
      }
      {
        winners.length<5 && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 py-6">
         <div className="w-full flex justify-center"><img className="w-36 h-36" src="Icons/loser.png" /></div>
          <h1 className="font-bold text-yellow-500">Loser</h1>
        </div>
      </>
      }
    </>
  }
      <div className="flex p-4 flex-row justify-center border-t border-slate-600 gap-4">
       <img src={`Logos/${playerteam}.webp`} className="w-24 h-24" />
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       stores.map((it)=>{
       if(it.team===playerteam)
         return(<>
      {it.players.map((i)=>{
        return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{i.name}</p>
           </div>
          
        </>)
      })}
         </>)
       })
     }
     </div>
       <div className="w-full py-2 flex-col flex justify-center items-center text-center">
    <div className="w-full py-4 flex-col items-center flex-wrap flex  justify-center"><button onClick={localremove} className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg">New Tournament</button></div>
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


export default Site;
