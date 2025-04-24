import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
import {HashLink} from 'react-router-hash-link'
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, ChartDataLabels);
const Stats = () => {
  const [searchParams] = useSearchParams();
  const [load,setLoad]=useState(true);
  const [items,setItems]=useState([]);
  const [histruns,setHistruns]=useState({});
  const [histwickets,setHistwickets]=useState({});
  const teamId = searchParams.get("team"); 
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
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
  const get_Players=async()=>{
    const res=await fetch(`https://intelligent-ailyn-handcricket-e8842259.koyeb.app/players?team=${teamId}`)
    const data=await res.json();
    const filterruns=data.sort((a,b)=>b.runs-a.runs).filter((i,ind)=>ind<6);
    const filterwickets=data.sort((a,b)=>b.wickets-a.wickets).filter((i,ind)=>ind<6);
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
    setItems(data);
    setLoad(false);
  }
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  useEffect(()=>{
    get_Players();
  },[])
  return (
  <>
{
  load==true && <>
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
  </>
}
{load==false && <>
   <div className="w-full bg-slate-800 flex p-1">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
</div>
  <div className="flex justify-center items-center py-4">
  <h1 className="text-slate-400 text-xl font-bold">Top Batters</h1>
  </div>
  <div className="w-full flex p-2 flex-wrap flex-row justify-center  gap-1">
    {items.sort((a,b)=>b.runs-a.runs).map((i,ind)=>{
    if(ind<6)
      return(<>
      <Link to={`/profile?name=${i.name}&team=${i.team}`}>
        <div className="p-1 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">

      <div className="flex justify-center items-center"><img className="w-24 h-24"src={i.image} /></div>
    <div className="my-2 w-full flex justify-center flex-col">
   {i.captain===false &&  <p className="text-sm font-bold text-slate-400">{i.name}</p>}
    {i.captain===true &&
      <p className=" text-sm font-bold text-slate-400">{i.name} (C)</p>
    }
          <div className=" w-full flex justify-center flex-col">
  <p className="text-sm font-bold text-slate-400">Runs-:{i.runs}</p>
        </div>
        </div>
        </div>
        </Link>
      </>)
    })}
  </div>
               <div className="bg-gray-900 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Batting Analysis</h2>
      <Bar data={histruns} options={histogramOptions} />
    </div>
    <div className="flex justify-center items-center py-4">
  <h1 className="text-slate-400 text-xl font-bold">Top Bowlers</h1>
  </div>
  <div className="w-full flex p-2 flex-wrap flex-row justify-center  gap-1">
    {items.sort((a,b)=>b.wickets-a.wickets).map((i,ind)=>{
    if(ind<6)
      return(<>
   <Link to={`/profile?name=${i.name}&team=${i.team}`}>
        <div className="p-1 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
     <div className="flex justify-center items-center"> <img className="w-24 h-24"src={i.image} /></div>
  <div className="my-2 w-full flex justify-center flex-col">
   {i.captain===false && 
   <p className="text-sm font-bold text-slate-400">{i.name}</p>}
    {i.captain===true &&
      <p className="text-sm font-bold text-slate-400">{i.name} (C)</p>}
              <div className=" w-full flex justify-center flex-col">
  <p className="text-sm font-bold text-slate-400">Wickets-:{i.wickets}</p>
        </div>
   </div>
        </div>
        </Link>
      </>)
    })}
  </div>
            <div className="bg-gray-900 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Bowling Analysis</h2>
      <Bar data={histwickets} options={histogramOptions} />
    </div>
      <footer className="bg-black mt-2 text-white">
      <div className="w-full flex justify-center  text-center flex-col p-4 mt-4">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-12">
    <HashLink smooth to='/#about'> <li className="text-gray-400">
       About Us</li></HashLink>
     <HashLink smooth to='/#services'> <li className="text-gray-400">Services</li></HashLink>
     <HashLink smooth to='/#gallery'><li className="text-gray-400">Gallery</li></HashLink>
        </ul>
     </div>
      <div className="w-full flex justify-center  text-center flex-col  mt-4">
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


export default Stats;
