import React from "react";
import {Link} from 'react-router-dom'
const TeamList = () => {
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  return (
    <>
<div className="w-full py-8 flex justify-center"><h1 className="text-green-400 text-2xl font-bold shadow-green-400">Select your Team</h1></div>
<div className="w-full  flex flex-wrap gap-x-6 gap-y-4 items-center justify-center flex-row ">
  {teams.map((i)=>{
  return(
  <div className="text-center rounded-lg  bg-slate-800">
    <Link to={`/details?team=${i}`}>
    <img src={`Logos/${i}.webp`} className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">{i.toUpperCase()}</h4>
    </Link>
    </div>
    )
  })}
</div>
</>
  );
};



export default TeamList;
