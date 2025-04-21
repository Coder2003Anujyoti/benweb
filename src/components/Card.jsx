import React,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import {useSearchParams,Link} from "react-router-dom"
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, ChartDataLabels);
const Card = () => {
  const [searchParams] = useSearchParams();
  const [load,setLoad]=useState(true);
  const [items,setItems]=useState([]);
  const [bar,setBar]=useState({});
  const [pie,setPie]=useState({});
  const teamId = searchParams.get("team"); 
  const team = searchParams.get("name");
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
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
  const get_Player=async()=>{
    const res=await fetch(`https://intelligent-ailyn-handcricket-e8842259.koyeb.app/names?team=${team}`)
    const data=await res.json();
    const barChartData = {
    labels: ["Matches", "Runs", "Wickets"],
    datasets: [
      {
        label: `Stats for ${data[0].name}`,
        data: [data[0].matches,data[0].runs, data[0].wickets],
        backgroundColor: ["#10b981", "Dodgerblue", "#ef4444"],
      },
    ],
  };

  const pieChartData = {
    labels: ["Runs", "Wickets"],
    datasets: [
      {
        data: [data[0].runs, data[0].wickets],
        backgroundColor: ["Dodgerblue", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };
    setLoad(false);
    setItems(data);
    setBar(barChartData)
  setPie(pieChartData)
  }
  useEffect(()=>{
    get_Player();
  },[])
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
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
{
  load==false &&
  <>
   <div className="w-full bg-slate-800 p-1 flex ">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
</div>
  <div className="w-full flex flex-col justify-center items-center gap-y-4">
  <div className="w-full flex flex-row justify-center items-center">
  <div className="flex justify-center items-center my-2">
    <img src={items[0].image} className="w-64 h-64" />
    </div>
    </div>
      <div className="w-full  flex flex-col flex-wrap justify-center items-center">
      <div className="text-center flex flex-row justify-center items-center">
   {items[0].captain==false && <h1 className="text-lg font-bold text-slate-400">Name-: {items[0].name} </h1>}
      {items[0].captain==true && <h1 className="text-lg font-bold text-slate-400">Name-: {items[0].name} (C)</h1>}
  </div>
        <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Role-: {items[0].role}</h1>
  </div>
          <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Matches-: {items[0].matches}</h1>
  </div>
  <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Runs-: {items[0].runs}</h1>
  </div>
        <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Wickets-: {items[0].wickets}</h1>
  </div>
  </div>
  <div className="text-center flex flex-row justify-center items-center">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
  </div>
  </div>
        <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-6">
        <div className="text-black font-bold p-4 rounded ">
          <Bar data={bar} options={barChartOptions} />
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
         <HashLink smooth to={`/history?team=${i}`}><li><img className="w-12 h-12" src={`Logos/${i}.webp`}/></li></HashLink>
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
}
</>
  )
};

export default Card;
