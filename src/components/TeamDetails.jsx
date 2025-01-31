import React from "react";
import {useSearchParams,Link} from "react-router-dom"
const TeamDetails = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("team"); 
  return (
    <>
<div className="w-full bg-slate-800 border-2 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex ">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
</div>
<div className="w-full my-16 flex flex-wrap gap-x-12 gap-y-12 items-center justify-center flex-row">
    <Link to={`/play?team=${teamId}`} >
    <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/cricket.png" className="w-24 h-24"></img>
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
    <img src="Icons/analytics.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Stats</h4>
    </div>
    </Link>
          <Link to={`/history?team=${teamId}`} >
        <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/history.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">History</h4>
    </div>
    </Link>
</div>
</>
  );
};



export default TeamDetails;
