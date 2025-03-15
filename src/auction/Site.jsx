import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link'
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, ChartDataLabels);
const LocalWinner=()=>{
  const lists=localStorage.getItem('winarray');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const Site = ({player,computer,playerteam,computerteam,remove}) => {
  const [team,setTeam]=useState(playerteam);
  const [win,setWin]=useState(()=>LocalWinner()||[])
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const jeet=win.filter((i)=>i.win===playerteam)
  const haar=win.filter((i)=>i.win!==playerteam)
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

        const percentage = Math.round(((value / total) * 100).toFixed(1)) + "%";
        return percentage;
      },
      color: "white",
      font: { weight: "bold", size: 14 },
    },
  },
};
const barChartData = {
    labels: ["Matches", "Win", "Lose/Tie"],
    datasets: [
      {
        label: `Stats for ${playerteam.toUpperCase()}`,
        data: [win.length,jeet.length,haar.length],
        backgroundColor: ["#10b981", "Dodgerblue", "#ef4444"],
      },
    ],
  };

  const pieChartData = {
    labels: ["Matches", "Win", "Lose/Tie"],
    datasets: [
      {
        data: [win.length,jeet.length,haar.length],
        backgroundColor: ["#10b981", "Dodgerblue", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };
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
         <HashLink to={`/analysis?winarray=${encodeURIComponent(JSON.stringify(win))}&&player=${encodeURIComponent(JSON.stringify(player))}&&computer=${encodeURIComponent(JSON.stringify(computer))}&&playerteam=${encodeURIComponent(JSON.stringify(playerteam))}&&computerteam=${encodeURIComponent(JSON.stringify(computerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/analysis.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Analysis</h4>
    </div>
    </HashLink>
             <HashLink to={`/matchfixtures?data=${encodeURIComponent(JSON.stringify(win))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/tournament.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Fixtures</h4>
    </div>
    </HashLink>
    </div>
          <div className="flex p-4 flex-row justify-center border-t border-slate-600 gap-4">
       <img src={`Logos/${playerteam}.webp`} className="w-28 h-28" />
     </div>
              <div className="grid grid-cols-1 md:grid-cols-2 my-4  gap-6">
        <div className="text-black  font-bold p-4 rounded ">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <div className=" p-4 rounded ">
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
        <div className="w-full my-6 border-t border-slate-600 p-4 flex justify-center">
    <h1 className="text-xl font-extrabold text-slate-400">Top Sellers</h1>
  </div>
   <div className="w-full flex  flex-wrap flex-row justify-center gap-2 my-4">
     {
     details.sort((a,b)=>b.bid-a.bid).map((i,ind)=>{
       if(ind<6)
         return(<>
    <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-xs font-bold">{i.name}</p>
    <div className="flex justify-center items-center"><img src={`Logos/${i.team}.webp`} className="w-8 h-8" /></div>
           </div>
          
         </>)
       })
     }
     </div>
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
