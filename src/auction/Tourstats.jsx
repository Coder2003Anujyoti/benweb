import React,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const Tourstats = () => {
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const [value,setValue]=useState("")
  const [data,setData]=useState([]);
  const [histruns,setHistruns]=useState({});
  const [histwickets,setHistwickets]=useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const player= JSON.parse(decodeURIComponent(queryParams.get("player"))) || [];
  const playerteam=JSON.parse(decodeURIComponent(queryParams.get("playerteam"))) || "";
  const computer= JSON.parse(decodeURIComponent(queryParams.get("computer"))) || [];
  const computerteam=JSON.parse(decodeURIComponent(queryParams.get("computerteam"))) || "";
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  const histogramOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: "rgb(148, 163, 184)", font: { weight: "bold" } },
      grid: { color: "rgba(255, 255, 255, 0.2)" }, // Light grid lines
    },
    x: {
      ticks: { color: "rgb(148, 163, 184)", font: { weight: "bold" } },
      grid: { display: false }, // Hide vertical grid lines
    },
  },
  plugins: {
    legend: { display: false }, 
        datalabels: {
          color: "transparent",
      font: { weight: "bold", size: 14 },
    },
          
  },
};
  const go=(i)=>{
    if(i===playerteam){
    const filterruns=player.slice().sort((a,b)=>b.runs-a.runs).filter((i,ind)=>ind<6);
    const filterwickets=player.slice().sort((a,b)=>b.wickets-a.wickets).filter((i,ind)=>ind<6);
    const histogramRuns = {
  labels: filterruns.map((batter)=> batter.name),
  datasets: [
    {
      label: "Runs Scored",
      data: filterruns.map((batter) => batter.runs),
      backgroundColor: "#3b82f6", // Blue color
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};
const histogramWickets = {
  labels: filterwickets.map((batter) => batter.name),
  datasets: [
    {
      label: "Wickets Scored",
      data: filterwickets.map((batter) => batter.wickets),
      backgroundColor: "#3b82f6", // Blue color
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};
  setHistruns(histogramRuns);
  setHistwickets(histogramWickets);
      setValue(i);
      setData(player)
    }
    else{
      const filterruns=computer.slice().sort((a,b)=>b.runs-a.runs).filter((i,ind)=>ind<6);
    const filterwickets=computer.slice().sort((a,b)=>b.wickets-a.wickets).filter((i,ind)=>ind<6);
    const histogramRuns = {
  labels: filterruns.map((batter)=> batter.name),
  datasets: [
    {
      label: "Runs Scored",
      data: filterruns.map((batter) => batter.runs),
      backgroundColor: "#3b82f6", // Blue color
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};
const histogramWickets = {
  labels: filterwickets.map((batter) => batter.name),
  datasets: [
    {
      label: "Wickets Scored",
      data: filterwickets.map((batter) => batter.wickets),
      backgroundColor: "#3b82f6", // Blue color
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
};
  setHistruns(histogramRuns);
  setHistwickets(histogramWickets);
      setValue(i);
      setData(computer)
    }
  }
  return (
  <>
  <div className="w-full bg-slate-800 p-2 flex ">
  <img className="w-16 h-16" src="Icons/auction.png"/>
</div>
<div className="w-full  flex flex-wrap gap-x-6 gap-y-4 items-center justify-center py-10 flex-row my-8">
  {teams.map((i)=>{
  if(i===playerteam||i===computerteam)
  return(
  <div className="text-center p-2 w-30 bg-slate-800 rounded-full flex items-center justify-center" onClick={()=>go(i)}>
    <img src={`Logos/${i}.webp`} className="w-14 h-14"></img>
    </div>
    )
  })}
</div>
{value!='' && <>
  <div className="flex p-4 flex-col justify-center items-center text-center border-t border-slate-600 gap-4">
     {value===playerteam && <h1 className="text-lg text-green-400 font-bold">Your Team</h1>}
    {value!==playerteam && <h1 className="text-lg text-green-400 font-bold">Opposition Team</h1>} 
       <img src={`Logos/${value}.webp`} className="w-24 h-24" />
     </div>
  <div className="w-full  flex justify-center">
    <h1 className="text-xl font-extrabold text-slate-400">Top Batters</h1>
  </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2 my-4">
     {
       data.slice().sort((a,b)=>b.runs-a.runs).map((it,ind)=>{
       if(it.team===value && ind<6)
         return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={it.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{it.name}</p>
        <p className="text-slate-400 text-xs font-bold">Runs-:{it.runs}</p>
           </div>
         </>)
       })
     }
     </div>
          <div className="bg-gray-900 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Batting Analysis</h2>
      <Bar data={histruns} options={histogramOptions} />
    </div>
      <div className="w-full  flex justify-center">
    <h1 className="text-xl font-extrabold text-slate-400">Top Bowlers</h1>
  </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2 my-4">
     {
       data.slice().sort((a,b)=>b.wickets-a.wickets).map((it,ind)=>{
       if(it.team===value && ind<6)
         return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={it.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{it.name}</p>
         <p className="text-slate-400 text-xs font-bold">Wickets-:{it.wickets}</p>
           </div>
         </>)
       })
     }
     </div>
     <div className="bg-gray-900 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Bowling Analysis</h2>
      <Bar data={histwickets} options={histogramOptions} />
    </div>
     </>
}
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



export default Tourstats;
