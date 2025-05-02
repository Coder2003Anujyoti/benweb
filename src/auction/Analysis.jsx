import React,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import {Link} from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, ChartDataLabels);
const Analysis = () => {
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const [bar,setBar]=useState({});
  const [pie,setPie]=useState({});
  const [value,setValue]=useState("")
  const [data,setData]=useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const winarray= JSON.parse(decodeURIComponent(queryParams.get("winarray"))) || [];
  const playerteam=JSON.parse(decodeURIComponent(queryParams.get("playerteam"))) || "";
  const computerteam=JSON.parse(decodeURIComponent(queryParams.get("computerteam"))) || "";
  const player=JSON.parse(decodeURIComponent(queryParams.get("player"))) || [];
  const computer=JSON.parse(decodeURIComponent(queryParams.get("computer"))) || [];
  const details=player.concat(computer);
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
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
  const go=(i)=>{
    const matches=winarray.filter((it)=>it.player===i || it.computer===i)
    const winners=matches.filter((item)=>item.win===i);
    const losers=matches.filter((item)=>item.win!==i);
    const barChartData = {
    labels: ["Matches", "Win", "Lose/Tie"],
    datasets: [
      {
        label: `Stats for ${i.toUpperCase()}`,
        data: [matches.length,winners.length, losers.length],
        backgroundColor: ["#10b981", "Dodgerblue", "#ef4444"],
      },
    ],
  };

  const pieChartData = {
    labels: [ "Win", "Lose/Tie"],
    datasets: [
      {
        data: [winners.length, losers.length],
        backgroundColor: ["Dodgerblue", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };
      setValue(i);
      setBar(barChartData);
      setPie(pieChartData);
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
        <div className="w-full flex p-1 my-2 flex-wrap flex-row justify-center gap-2">
     {
       details.map((it)=>{
       if(it.team===value)
        return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={it.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{it.name}</p>
           </div>
          
         </>)
       })
     }
     </div>
     <div className="grid grid-cols-1 md:grid-cols-2 my-4  gap-6">
        <div className="text-black  font-bold p-4 rounded ">
          <Bar data={bar} options={barChartOptions} />
        </div>
        <div className=" p-4 rounded ">
          <Pie data={pie} options={pieChartOptions} />
        </div>
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



export default Analysis;
