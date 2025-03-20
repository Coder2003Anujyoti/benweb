import React,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import Fire from './Fire';
import {Link} from 'react-router-dom';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, ChartDataLabels);
const LocalData=()=>{
  const lists=localStorage.getItem('iplwinlist');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalWin=()=>{
  const lists=localStorage.getItem('iplwinnerlist');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const Site = ({playerteam,store,localremove}) => {
  const [stores,setStores]=useState(store);
  const [win,setWin]=useState(()=>LocalWin()||[])
  const [sno,setSno]=useState(0)
  const [match,setMatch]=useState(()=>LocalData()||[])
  const [bar,setBar]=useState({});
  const [pie,setPie]=useState({});
  const winners=win.filter((i)=>i.win===playerteam);
  const losers=win.filter((i)=>i.win!==playerteam);
  const totalwinners=match.filter((i)=>i.win===playerteam);
  const totallosers=match.filter((i)=>i.win!==playerteam);
  const motms=store.slice().sort((a,b)=>(b.runs+b.wickets)-(a.runs+a.wickets)).filter((i,ind)=> ind===0)
  const potm=motms[0];
  const batters=store.slice().sort((a,b)=>b.runs-a.runs)
  const bowlers=store.slice().sort((a,b)=>b.wickets-a.wickets)
  const allrounders=store.slice().sort((a,b)=>(b.runs*b.wickets)-(a.wickets*a.runs))
  const topstriker=store.filter((i)=>i.matches>0 && i.runs>0).slice().sort((a,b)=>Math.round(b.runs/b.matches)-Math.round(a.runs/a.matches));
  const economy=store.filter((i)=>i.matches>0 && i.wickets>0).slice().sort((a,b)=>Math.round(b.wickets/b.matches)-Math.round(a.wickets/a.matches));
   const emerging=store.filter((i)=>i.matches>0 && i.runs>0 && i.wickets>0).slice().sort((a, b) => {
  if (a.matches !== b.matches) {
    return a.matches - b.matches; 
  }
  return (b.runs + b.wickets) - (a.runs + a.wickets); 
});
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
const barChartData = {
    labels: ["Matches", "Win", "Lose/Tie"],
    datasets: [
      {
        label: `Stats for ${playerteam.toUpperCase()}`,
        data: [match.length,totalwinners.length, totallosers.length],
        backgroundColor: ["#10b981", "Dodgerblue", "#ef4444"],
      },
    ],
  };

  const pieChartData = {
    labels: ["Matches", "Win", "Lose/Tie"],
    datasets: [
      {
        data: [match.length,totalwinners.length, totallosers.length],
        backgroundColor: ["#10b981", "Dodgerblue", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };
  return (
   <>
     <div className="w-full bg-slate-800 p-1 flex ">
  <img className="w-28 h-16" src="Logos/Logo.webp"/>
</div>
  {
    win.length>=9 && <>
      {win[win.length-1].win===playerteam && win.length===11 && <>
    <div className="flex flex-row flex-wrap gap-x-12 gap-y-6 justify-center w-full">
        <div className=" flex flex-col justify-center text-center gap-y-6">
         <div className="w-full flex justify-center mt-14"><img className="w-32 h-32" src="Icons/trophy.png" /></div>
          <h1 className="font-bold text-yellow-500">Champions</h1>
        </div>
        <div className=" my-3 flex flex-col gap-y-6 justify-center text-center">
          <h1 className="text-sm font-extrabold text-yellow-400">Player of the Tournament</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={potm.image} /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{potm.name}</h1> 
    </div>
    </div>
      <Fire  show={true} />
      </>
      }
      {
  ( ( win.length===9 && winners.length<=6) || (win.length===10 && win[win.length-1].win!==playerteam) || (win.length===11 && win[win.length-1].win!==playerteam)) && <>
     <div className="flex flex-row flex-wrap gap-x-12 gap-y-6 justify-center w-full ">
        <div className=" flex flex-col justify-center text-center gap-y-6">
         <div className="w-full flex justify-center mt-14"><img className="w-32 h-32" src="Icons/loser.png" /></div>
          <h1 className="font-bold text-yellow-500">Loser</h1>
        </div>
       <div className="my-3 flex flex-col gap-y-6 justify-center text-center">
          <h1 className="text-sm font-extrabold text-yellow-400">Player of the Tournament</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={potm.image} /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{potm.name}</h1> 
    </div>
    </div>
      </>
      }
    </>
  }
  { win.length<9 && <>
 <div className="w-full text-center my-2">
  <h3 className="font-bold text-sm text-red-400 ml-2 mr-2">*Need to win more than 6 matches to reach knockouts.</h3>
</div>
</>}
  { ((win.length===9 && winners.length>=7) || 
 (win.length===10 && win[win.length-1].win===playerteam)) && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 py-6">
          <h1 className="font-bold text-sm ml-2 mr-2 text-yellow-500">Welcome to Knockouts</h1>
        </div>
</>}
     <div className="w-full my-16 flex flex-wrap gap-x-12 gap-y-12 items-center justify-center flex-row">
  {(win.length<9 || (win.length===9 && winners.length>=7) || (win.length===10 && win[win.length-1].win===playerteam))  && <>
     <HashLink to={`/iplgame?data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/crickets.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Play</h4>
    </div>
    </HashLink>
    </>}
         <HashLink to={`/iplteam?matchesarray=${encodeURIComponent(JSON.stringify(match))}&&data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/team.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Teams</h4>
    </div>
    </HashLink>
         <HashLink to={`/iplfixtures?data=${encodeURIComponent(JSON.stringify(match))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/tournament.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Fixtures</h4>
    </div>
    </HashLink>
         <HashLink to={`/iplplayerstats?data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/stats.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Stats</h4>
    </div>
    </HashLink>
    </div>
      {match.length>0 && <>
     <div className="flex flex-row flex-wrap gap-x-12 gap-y-6 p-2 justify-center w-full ">
  <div  className="flex justify-start items-center">
      <img onClick={()=>sno>0?setSno(sno-1):setSno(sno)} src="Icons/before.png" className="w-12 h-12"/>
    </div>
    <div className="flex flex-col  gap-y-4 justify-center text-center">
  {sno==0 && <>  <h1 className="text-sm font-extrabold text-yellow-400 ">Top Batter</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={batters[0].image} loading="lazy" /></div>
   <div className="w-full flex justify-center"><img className="w-14 h-14" src={`Logos/${batters[0].team}.webp`} loading="lazy" /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{batters[0].name}</h1> 
     </>}
       {sno==1 && <>  <h1 className="text-sm font-extrabold text-yellow-400 ">Top Bowler</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={bowlers[0].image} loading="lazy"/></div>
     <div className="w-full flex justify-center"><img className="w-14 h-14" src={`Logos/${bowlers[0].team}.webp`} loading="lazy" /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{bowlers[0].name}</h1> 
     </>}
       {sno==2 && <>  <h1 className="text-sm font-extrabold text-yellow-400 ">Top All-rounder</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={allrounders[0].image} loading="lazy" /></div>
    <div className="w-full flex justify-center"><img className="w-14 h-14" src={`Logos/${allrounders[0].team}.webp`} loading="lazy" /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{allrounders[0].name}</h1> 
     </>}
    {sno==3 && <>  <h1 className="text-sm font-extrabold text-yellow-400 ">Top Striker</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={topstriker[0].image} loading="lazy"/></div>
    <div className="w-full flex justify-center"><img className="w-14 h-14" src={`Logos/${topstriker[0].team}.webp`} loading="lazy" /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{topstriker[0].name}</h1> 
     </>}
     {sno==4 && <>  <h1 className="text-sm font-extrabold text-yellow-400 ">Best Economy</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={economy[0].image} loading="lazy" /></div>
      <div className="w-full flex justify-center"><img className="w-14 h-14" src={`Logos/${economy[0].team}.webp`} loading="lazy" /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{economy[0].name}</h1> 
     </>}
            {sno==5 && <>  <h1 className="text-sm font-extrabold text-yellow-400 ">Emerging Star</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={emerging[0].image} loading="lazy" /></div>
          <div className="w-full flex justify-center"><img className="w-14 h-14" src={`Logos/${emerging[0].team}.webp`} loading="lazy" /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{emerging[0].name}</h1> 
     </>}
    </div>
        <div className="flex justify-center items-center">
      <img src="Icons/next.png" onClick={()=>sno<5?setSno(sno+1):setSno(sno)} className="w-12 h-12"/>
    </div>
        </div>
      </>}
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
       <div className="w-full py-2 flex-col flex justify-center items-center text-center">
    <div className="w-full py-4 flex-col items-center flex-wrap flex  justify-center"><button onClick={localremove} className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg">New Tournament</button></div>
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
