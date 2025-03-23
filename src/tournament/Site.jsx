import React,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import Fire from './Fire';
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import teamLogos from "./teamLogos"; 
import useWindowSize from "./useWindowSize";
import {Link} from 'react-router-dom';
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, ChartDataLabels);
const LocalData=()=>{
  const lists=localStorage.getItem('winlist');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const LocalWin=()=>{
  const lists=localStorage.getItem('winnerlist');
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
  const { width, height } = useWindowSize();
  const [showCelebration, setShowCelebration] = useState(null);
  const winners=win.filter((i)=>i.win===playerteam);
  const losers=win.filter((i)=>i.win!==playerteam);
  const totalwinners=match.filter((i)=>i.win===playerteam);
  const totallosers=match.filter((i)=>i.win!==playerteam);
  const motms=store.map((i)=>{
    return i.players.sort((a,b)=>(b.runs+b.wickets)-(a.runs+a.wickets)).filter((i,ind)=> ind===0)[0]
  });
  const potm=motms.sort((a,b)=>(b.runs+b.wickets)-(a.runs+a.wickets));
  const batters=store.flatMap((i)=>i.players).slice().sort((a,b)=>b.runs-a.runs)
  const bowlers=store.flatMap((i)=>i.players).slice().sort((a,b)=>b.wickets-a.wickets)
  const allrounders=store.flatMap((i)=>i.players).slice().sort((a,b)=>(b.runs*b.wickets)-(a.wickets*a.runs))
  const topstriker=store.flatMap((i)=>i.players).filter((i)=>i.matches>0 && i.runs>0).slice().sort((a,b)=>Math.round(b.runs/b.matches)-Math.round(a.runs/a.matches));
  const economy=store.flatMap((i)=>i.players).filter((i)=>i.matches>0 && i.wickets>0).slice().sort((a,b)=>Math.round(b.wickets/b.matches)-Math.round(a.wickets/a.matches));
   const emerging=store.flatMap((i)=>i.players).filter((i)=>i.matches>0 && i.runs>0 && i.wickets>0).slice().sort((a, b) => {
  if (a.matches !== b.matches) {
    return a.matches - b.matches; 
  }
  return (b.runs + b.wickets) - (a.runs + a.wickets); 
});
  const sellers=store.flatMap((i)=>i.players).slice().sort((a,b)=>(b.bid)-(a.bid)).filter((i,ind)=>ind<5)
const selldata = {
    labels: sellers.map(() => ""), // Hide y-axis text
    datasets: [
      {
        data:sellers.map((i)=>i.bid),
        backgroundColor: "Dodgerblue",
        borderColor: "Dodgerblue",
        borderWidth: 1,
        borderRadius:20,
        barPercentage: 0.5,// Reduce bar thickness
        categoryPercentage:0.5, // Increase spacing between bars
      },
    ],
  };

  // Chart options
  const selloptions = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: {
        titleFont: { weight: "bold" },
        bodyFont: { weight: "bold" },
      },
      datalabels:{
        color:"white",
        font: { weight: "bold", size: 12 },
      }
    },
    scales: {
      x: { display: false }, // Hide x-axis labels
      y: { display: false }, // Hide y-axis labels (we are using images instead)
    },
    elements: {
      bar: { maxBarThickness: 0, 
      borderRadius:20// Reduce bar thickness for more spacing
      }
    },
  };
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
  useEffect(() => {
    if  ( ( win.length===9 && winners.length<=6) || (win.length===10 && win[win.length-1].win!==playerteam) || (win.length===11 && win[win.length-1].win!==playerteam)) {
    setShowCelebration(false)
    }
    else{
      setTimeout(() => setShowCelebration(true), 100);
    }
  }, [win]);
  return (
   <>
            {showCelebration===true && win.length<=10 && <>
    <div className="flex py-2 flex-col items-center justify-center text-white text-center">
      {/* Fireworks */}
      {showCelebration && <Confetti width={width} height={height} />}
      {/* Trophy Animation */}
      <motion.img
        src="Icons/trophy.png"
        alt="Trophy"
        className="w-40 h-40 md:w-60 md:h-60"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 2, type: "spring", stiffness: 100 }}
      />

      {/* Title */}
      <motion.h1
        className="text-lg md:text-xl font-bold mt-4 text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to the Ultimate Cricket League!
      </motion.h1>
      {/* Team Logos */}
      <div className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-1 my-6">
        {teamLogos.map((logo, index) => (
          <motion.img
            key={index}
            src={logo}
            alt={`Team ${index + 1}`}
            className="w-16 h-16 md:w-24 md:h-24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        ))}
       <div className="w-full flex-col items-center flex-wrap flex  justify-center my-12"> <button onClick={()=>setShowCelebration(false)} className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg">Start Playing</button></div>
      </div>
    </div>
    <Fire show={true} />
  </>}
  {
    showCelebration===true && win.length===11 && win[win.length-1].win===playerteam &&  <>
         <div className="flex py-2 flex-col items-center justify-center  text-white text-center">
      {/* Fireworks */}
      {showCelebration && <Confetti width={width} height={height} />}
      
      {/* Trophy Animation */}
      <motion.img
        src="Icons/trophy.png"
        alt="Trophy"
        className="w-40 h-40 md:w-60 md:h-60"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 2, type: "spring", stiffness: 100 }}
      />

      {/* Title */}
      <motion.h1
        className="text-lg md:text-xl font-bold mt-4 text-yellow-400"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Congratulations to the Champions!
      </motion.h1>

      {/* Champion Team Logo */}
      <motion.img
        src={`Logos/${playerteam}.webp`}
        alt="Champion Team"
        className="w-32 h-32 md:w-40 md:h-40 mt-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      {/* Champion Text */}
      <motion.p
        className="text-lg md:text-xl font-semibold mt-4 text-green-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        The Ultimate Cricket League Winners!
      </motion.p>
    <div className="w-full flex-col items-center flex-wrap flex my-12 justify-center"> <button onClick={()=>setShowCelebration(false)} className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg">Start Playing</button></div>
      <Fire show={true} />
    </div>
    </>
  }
  {showCelebration===false && <> 
     <div className="w-full bg-slate-800 p-1 flex ">
  <img className="w-24 h-24" src="Icons/stadium.png"/>
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
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={potm[0].image} /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{potm[0].name}</h1> 
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
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={potm[0].image} /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{potm[0].name}</h1> 
    </div>
    </div>
      </>
      }
    </>
  }
  { win.length<9 && <>
 <div className="w-full text-center my-2">
  <h3 className="font-bold text-sm text-red-400 ml-2 mr-2">*Need to win 7 matches to reach knockouts.</h3>
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
     <HashLink to={`/game?data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/crickets.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Play</h4>
    </div>
    </HashLink>
    </>}
         <HashLink to={`/team?matchesarray=${encodeURIComponent(JSON.stringify(match))}&&data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/team.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Teams</h4>
    </div>
    </HashLink>
         <HashLink to={`/fixtures?data=${encodeURIComponent(JSON.stringify(match))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/tournament.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Fixtures</h4>
    </div>
    </HashLink>
         <HashLink to={`/playerstats?data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
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
            <h1 className="text-xs font-extrabold text-slate-400 text-center">Top Sellers(In Lakhs)</h1>
 <div className="w-full text-center flex mx-auto p-4  gap-2 overflow-hidden">

      {/* Left Side: Team Images */}
      <div className="flex flex-col justify-between my-5 gap-7 h-full ">
        {sellers.map((team) => (
          <div key={team.name} className="flex items-center justify-center">
            <img src={team.image} alt={team.name} className="w-14 h-14 object-contain" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="flex-grow overflow-hidden ">
          <Bar data={selldata} options={selloptions} />

      </div>

      {/* Right Side: Team Images */}
                <div className="flex flex-col justify-between  h-full my-4  gap-8">
        {sellers.map((team) => (
          <div key={team.name} className="flex items-center justify-center">
            <img src={`Logos/${team.team}.webp`} alt={team.name} className="w-14 h-14 object-contain" />
          </div>
        ))}
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
}
   </>
  );
};


export default Site;
