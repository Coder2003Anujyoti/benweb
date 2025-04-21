import React,{useEffect,useState} from "react";
import {HashLink} from 'react-router-hash-link'
import {useSearchParams,Link} from "react-router-dom"
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, ChartDataLabels);
const TeamDetails = () => {
  const [searchParams] = useSearchParams();
  const [bar,setBar]=useState({});
  const [pie,setPie]=useState({});
  const [histruns,setHistruns]=useState({});
  const [histwickets,setHistwickets]=useState({});
  const teamId = searchParams.get("team"); 
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const [load,setLoad]=useState(true);
    const [item,setItem]=useState([]);
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
    const barChartOptions = {
  plugins: {
    legend: {
      labels: {
        color: "rgb(148, 163, 184)", // Legend text color
        font: {
          weight: "bold", // Make legend text bold
        },
      },
    },
    datalabels: {
      formatter: (value, context) => {
        const data = context.dataset.data;
        if (!data || data.length === 0) return "0%"; // Prevent errors

        const total = data.reduce((acc, val) => acc + (val || 0), 0); // Handle undefined values
        if (total === 0) return "0%"; // Prevent division by zero

        const percentage = Math.round(((value / total) * 100).toFixed(1)) + "%";
        return percentage;
      },
      color: "transparent",
      font: { weight: "bold", size: 14 },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "rgb(148, 163, 184)", // X-axis label color
        font: {
          weight: "bold", // Make X-axis labels bold
        },
      },
      grid: {
        color: "rgb(148, 163, 184)", // X-axis grid lines color
                font: {
          weight: "bold", // Make Y-axis labels bold
        },
      },
    },
    y: {
      ticks: {
        color: "rgb(148, 163, 184)", // Y-axis label color
        font: {
          weight: "bold", // Make Y-axis labels bold
        },
      },
      grid: {
        color: "rgb(148, 163, 184)", // Y-axis grid lines color
        font: {
          weight: "bold", // Make Y-axis labels bold
        },
      },
    },
  },
};
const pieChartOptions = {
  plugins: {
    legend: {
      labels: {
        color: "rgb(148,163,184)",
        font: { weight: "bold" },
      },
    },
    datalabels: {
      formatter: (value, context) => {
        const data = context.dataset.data;
        if (!data || data.length === 0) return "0%"; // Prevent errors

        const total = data.reduce((acc, val) => acc + (val || 0), 0); // Handle undefined values
        if (total === 0) return "0%"; // Prevent division by zero

        const percentage = Math.round(((value / total) * 100)) + "%";
        return percentage;
      },
      color: "white",
      font: { weight: "bold", size: 14 },
    },
  },
};
  const get_data=async()=>{
    const response=await fetch('https://intelligent-ailyn-handcricket-e8842259.koyeb.app/');
    const data=await response.json();
    const pl=data.details.filter((i)=>i.teamid===teamId);
    const filterruns=data.data.sort((a,b)=>b.runs-a.runs).filter((i,ind)=>ind<6);
    const filterwickets=data.data.sort((a,b)=>b.wickets-a.wickets).filter((i,ind)=>ind<6);
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
    const barChartData = {
    labels: ["Matches", "Win", "Lose/Tie"],
    datasets: [
      {
        label: `Stats for ${teamId.toUpperCase()}`,
        data: [pl[0].matches,pl[0].win,pl[0].matches-pl[0].win],
        backgroundColor: ["#10b981", "Dodgerblue", "#ef4444"],
      },
    ],
  };

  const pieChartData = {
    labels: [ "Win", "Lose/Tie"],
    datasets: [
      {
        data: [pl[0].win,pl[0].matches-pl[0].win],
        backgroundColor:  ["Dodgerblue", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };
  setBar(barChartData)
  setPie(pieChartData)
    setItem(data.data);
    setHistruns(histogramRuns);
  setHistwickets(histogramWickets);
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
    <div className="w-full bg-slate-800 flex p-1">
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
<div className="w-full flex flex-col border-t border-b border-slate-600 p-4">
      <div className="w-full flex justify-center"><p className="text-xl font-extrabold text-slate-400">Analysis</p></div>
        <div className="grid  grid-cols-1 md:grid-cols-2 my-4 gap-6 text-center flex flex-row">
        <div className="text-black font-bold p-4 rounded ">
          <Bar data={bar} options={barChartOptions} />
        </div>
        <div className=" p-4 rounded ">
          <Pie data={pie} options={pieChartOptions} />
        </div>
      </div>
      </div>
<div className="w-full flex flex-col text-center gap-4 my-6">
      <h1 className="text-xl font-extrabold text-green-400">Tournament Stats</h1>
  <div className="w-full py-4 flex justify-center">
    <h1 className="text-lg font-extrabold text-slate-400">Top Batters</h1>
  </div>
  <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2 ">
    
    {
      item.sort((a,b)=>b.runs-a.runs).map((i,ind)=>{
      if(ind<6)
        return(<>
      <Link to={`/profile?name=${i.name}&team=${i.team}`}>
            <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{i.name}</p>
         <p className="text-slate-400 text-xs font-bold">Runs-:{i.runs}</p>
           </div>
           </Link>
        </>)
      })
    }
    </div>
             <div className="bg-gray-900 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Batting Analysis</h2>
      <Bar data={histruns} options={histogramOptions} />
    </div>
    <div className="w-full py-4 flex justify-center">
    <h1 className="text-lg font-extrabold text-slate-400">Top Bowlers</h1>
  </div>
  <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
    {
      item.sort((a,b)=>b.wickets-a.wickets).map((i,ind)=>{
      if(ind<6)
        return(<>
       <Link to={`/profile?name=${i.name}&team=${i.team}`}>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{i.name}</p>
         <p className="text-slate-400 text-xs font-bold">Wickets-:{i.wickets}</p>
           </div>
        </Link>
        </>)
      })
    }
    </div>
          <div className="bg-gray-900 p-6  w-full md:w-3/4 lg:w-1/2 mx-auto">
      <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Bowling Analysis</h2>
      <Bar data={histwickets} options={histogramOptions} />
    </div>
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
