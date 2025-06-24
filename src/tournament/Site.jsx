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
const LocalStand=()=>{
  const lists=localStorage.getItem('standings');
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return [];
}
}
const Site = ({playerteam,store,localremove,fixture}) => {
  const [stores,setStores]=useState(store);
  const [fixtures,setFixtures]=useState(fixture)
  const [standings,setStandings]=useState(()=>LocalStand()||[])
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
    return i.players.slice().sort((a,b)=>(b.runs+b.wickets)-(a.runs+a.wickets)).filter((i,ind)=> ind===0)[0]
  });
  const potm=motms.slice().sort((a,b)=>(b.runs+b.wickets)-(a.runs+a.wickets));
  const batters=store.flatMap((i)=>i.players).slice().sort((a,b)=>b.runs-a.runs)
  const bowlers=store.flatMap((i)=>i.players).slice().sort((a,b)=>b.wickets-a.wickets)
  const sellers=store.flatMap((i)=>i.players).slice().sort((a,b)=>(b.bid)-(a.bid)).filter((i,ind)=>ind<5)
const selldata = {
    labels: sellers.map(() => ""), // Hide y-axis text
    datasets: [
      {
        data:sellers.map((i)=>i.bid.toLocaleString("en-IN")),
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

        const percentage = Math.round(((value / total) * 100))+ "%";
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
    labels: [ "Win", "Lose/Tie"],
    datasets: [
      {
        data: [totalwinners.length, totallosers.length],
        backgroundColor: ["Dodgerblue", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };
  useEffect(() => {
      setTimeout(() => setShowCelebration(true), 100);
  }, [win]);
  useEffect(()=>{
 if(win.length===0){
   const lastindex=fixtures.findIndex((i)=>i.winner==="");
   let stand=[]
   const m=teams.map((i)=>{
    const matches= fixtures.filter((it,indx)=> indx<lastindex && (it.player===i || it.computer===i) && i.winner!='').length
    const wins=fixtures.filter((it,indx)=> indx<lastindex && it.winner===i).length
    const draw=fixtures.filter((it,indx)=> indx<lastindex &&  (it.player===i || it.computer===i) && it.winner==="Draw").length
 stand.push({name:i,matches:matches,win:wins,lose:matches-(wins+draw),draw:draw})
   return stand
   })
   localStorage.setItem('standings', 
      JSON.stringify(stand));
      setStandings(stand)
   
 }
    if(win.length>0 && win.length<9){
      const k=fixtures.map((i)=>{
        if(i.winner=="" && ((i.player===win[win.length-1].player && i.computer===win[win.length-1].computer)||(i.computer===win[win.length-1].player && i.player===win[win.length-1].computer))){
          i.winner=win[win.length-1].win;
        }
        return {...i}
      })

 const lastindex=k.findIndex((i)=>i.winner==="");
   let stand=[]
   const m=teams.map((i)=>{
    const matches= k.filter((it,indx)=> indx<lastindex && (it.player===i || it.computer===i) && i.winner!='').length
    const wins=fixtures.filter((it,indx)=> indx<lastindex && it.winner===i).length
    const draw=fixtures.filter((it,indx)=> indx<lastindex &&  (it.player===i || it.computer===i) && it.winner==="Draw").length
 stand.push({name:i,matches:matches,win:wins,lose:matches-(wins+draw),draw:draw})
   return stand
   })
   localStorage.setItem('standings', 
      JSON.stringify(stand));
      localStorage.setItem('fixtures', 
      JSON.stringify(k));
      setStandings(stand)
      setFixtures(k)
    }
    if(win.length==9){
      const k=fixtures.map((i)=>{
        if(i.winner=="" && ((i.player===win[win.length-1].player && i.computer===win[win.length-1].computer)||(i.computer===win[win.length-1].player && i.player===win[win.length-1].computer))){
          i.winner=win[win.length-1].win;
        }
        return {...i}
      })
   let stand=[]
   const m=teams.map((i)=>{
    const matches= k.filter((it,indx)=> (it.player===i || it.computer===i) && i.winner!='').length
    const wins=fixtures.filter((it,indx)=>  it.winner===i).length
    const draw=fixtures.filter((it,indx)=>  (it.player===i || it.computer===i) &&  it.winner==="Draw").length
 stand.push({name:i,matches:matches,win:wins,lose:matches-(wins+draw),draw:draw})
   return stand
   })
   localStorage.setItem('standings', 
      JSON.stringify(stand));
      localStorage.setItem('fixtures', 
      JSON.stringify(k));
      setStandings(stand)
      setFixtures(k)
    }
  },[win])
  return (
   <>
   {showCelebration===true && (win.length<=10 || (win.length===11 && win[win.length-1].win!==playerteam)) && <>
    <div className="flex py-2 my-4 overflow-hidden flex-col items-center justify-center text-white text-center">
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
    <Fire show={true} />
    </div>
  </>}
  {
    showCelebration===true && win.length===11 && win[win.length-1].win===playerteam &&  <>
         <div className="flex py-2 my-4 overflow-hidden flex-col items-center justify-center  text-white text-center">
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
  ( ( win.length===9 && !standings.slice().sort((a,b)=>b.win-a.win).filter((i,ind)=>ind<4).map((i)=>i.name).includes(playerteam)) || (win.length===10 && win[win.length-1].win!==playerteam) || (win.length===11 && win[win.length-1].win!==playerteam)) && <>
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
  <h3 className="font-bold text-sm text-red-400 ml-2 mr-2">*Need to become top 4 to reach knockouts.</h3>
</div>
</>}
  { ((win.length===9 && standings.slice().sort((a,b)=>b.win-a.win).filter((i,ind)=>ind<4).map((i)=>i.name).includes(playerteam)) || 
 (win.length===10 && win[win.length-1].win===playerteam)) && <>
        <div className="w-full flex flex-col justify-center text-center gap-y-6 py-6">
          <h1 className="font-bold text-sm ml-2 mr-2 text-yellow-500">Welcome to Knockouts</h1>
        </div>
</>}
     <div className="w-full my-16 flex flex-wrap gap-x-12 gap-y-12 items-center justify-center flex-row">
  {(win.length<9 || (win.length===9 && standings.slice().sort((a,b)=>b.win-a.win).filter((i,ind)=>ind<4).map((i)=>i.name).includes(playerteam)) || (win.length===10 && win[win.length-1].win===playerteam))  && <>
     <HashLink to={`/game?data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/crickets.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Play</h4>
    </div>
    </HashLink>
    </>}
         <HashLink to={`/team?matchesarray=${encodeURIComponent(JSON.stringify(fixtures))}&&data=${encodeURIComponent(JSON.stringify(stores))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
     <div className="text-center p-4 rounded-lg  bg-slate-800">
    <img src="Icons/team.png" className="w-24 h-24"></img>
    <h4 className="text-lg text-slate-400 font-bold">Teams</h4>
    </div>
    </HashLink>
         <HashLink to={`/fixtures?data=${encodeURIComponent(JSON.stringify(fixtures))}&&team=${encodeURIComponent(JSON.stringify(playerteam))}`}>
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
            <div className="max-w-2xl mx-auto p-4 bg-gray-900 text-white">
      <h2 className="text-center text-2xl font-bold mb-4">UCL 2025 Points Table</h2>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-600 text-gray-400">
            <th className="p-2 text-left">#</th>
            <th className="p-2 text-left">Team</th>
            <th className="p-2">M</th>
            <th className="p-2">W</th>
            <th className="p-2">L</th>
            
            <th className="p-2">Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.slice().sort((a,b)=>b.win-a.win).map((team, index) => (
            <tr key={team.id} className="border-b border-gray-700 text-center font-bold">
              <td className="p-2">{index + 1}</td>
              <td className="p-2 flex items-center font-bold">
                <img src={`Logos/${team.name}.webp`} alt={team.name} className="w-6 h-6 mr-2" />
                {team.name.toUpperCase()}
              </td>
              <td className="p-2">{team.matches}</td>
              <td className="p-2">{team.win}</td>
              <td className="p-2">{team.lose}</td>
              
        <td className="p-2">{2*(team.win) +1*(team.draw)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      { win.length>=9 && (( win.length===9 && !standings.slice().sort((a,b)=>b.win-a.win).filter((i,ind)=>ind<4).map((i)=>i.name).includes(playerteam)) || (win.length===10 && win[win.length-1].win!==playerteam) || (win.length===11 && win[win.length-1].win!==playerteam) || (win[win.length-1].win===playerteam && win.length===11)) && <>
     <div className="flex flex-row flex-wrap gap-x-12 gap-y-6 p-2 justify-center w-full ">
    <div className="flex flex-col  gap-y-4 justify-center text-center">
    <h1 className="text-sm font-extrabold text-yellow-400 ">Top Batter</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={batters[0].image} loading="lazy" /></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{batters[0].name}</h1> </div>
        <div className="flex flex-col  gap-y-4 justify-center text-center">
        <h1 className="text-sm font-extrabold text-yellow-400 ">Top Bowler</h1> 
     <div className="w-full flex justify-center"><img className="w-36 h-36" src={bowlers[0].image} loading="lazy"/></div>
     <h1 className="text-sm font-extrabold text-yellow-400">{bowlers[0].name}</h1> </div>
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
