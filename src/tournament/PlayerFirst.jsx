import React,{useState,useEffect,useRef} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Winner from "./Winner.jsx"
import { Line,Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale,LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend,ArcElement);
var bar=0;
var cbar=0;
var sbar=0;
const PlayerFirst = ({players,oppositionplayers}) => {
  const [show,setShow]=useState(true);
  const [turn,setTurn]=useState("Player");
  const [playeroption,setPlayeroption]=useState(0);
  const [leader,setLeader]=useState("");
  const [computeroption,setComputeroption]=useState(0)
  const [id,setId]=useState([]);
  const [ids,setIds]=useState([]);
  const [playerrun,setPlayerrun]=useState(0);
  const [playerwicket,setPlayerwicket]=useState(0);
  const [yourteam,setYourteam]=useState([]);
  const [opposteam,setOpposteam]=useState([]);
  const [image,setImage]=useState([]);
  const [playerstats,setPlayerstats]=useState([]);
  const [overs,setOvers]=useState(0);
  const [target,setTarget]=useState(-1)
  const [number,setNumber]=useState(0);
  const [oppositionstats,setOppositionstats]=useState([]);
  const [index,setIndex]=useState(0);
  const [runs,setRuns]=useState(0);
  const [winner,setWinner]=useState("");
  const [wickets,setWickets]=useState(0);
  const [event, setEvent] = useState(null);
  const [showButtons, setShowButtons] = useState(true);
  const [playerover,setPlayerover]=useState([])
  const [computerover,setComputerover]=useState([])
  const timeoutRef = useRef(null); 
  const buttons=[1,2,3,4,5,6];
  useEffect(()=>{
    const get_Player=players.map((i)=>{
      i.runs=0;
      i.wickets=0;
      return {...i}
    })
    const get_Opposition=oppositionplayers.map((i)=>{
      i.runs=0;
      i.wickets=0;
      return {...i}
    })
    setYourteam(get_Player);
    setOpposteam(get_Opposition);
  },[])
  const add_Player=(i)=>{
    if(turn==="Player"){
    window.scrollTo({ top: 0, behavior: "smooth" });
    setImage(i);
    setLeader(turn);
    setPlayeroption(0);
    setComputeroption(0)
    setId([...id,i.name])
    setIds([...ids,i.name])
    setPlayerstats(players);
    setOppositionstats(oppositionplayers)
    setShow(false);
    }
      if(turn==="Computer"){
    window.scrollTo({ top: 0, behavior: "smooth" });
    setImage(i);
    setId([...id,i.name])
    setIds(ids)
    setPlayeroption(0);
    setComputeroption(0)
    setPlayerstats(players);
    setOppositionstats(oppositionplayers)
    setShow(false);
    setLeader(turn);
  }
  }
  const check=(i)=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  let value=Math.floor(Math.random()*6)+1;
 if (timeoutRef.current) 
 clearTimeout(timeoutRef.current);
  if(turn==="Player"){
  if(i!=value && i!=4 && i!=6){
    setPlayerover([...playerover,i])
  }
    if((i==4 || i==6) && i!=value){
    setShowButtons(false)
    setPlayerover([...playerover,i])
    setEvent(i);
    timeoutRef.current = setTimeout(() => {
      setShowButtons(true);
    }, 1000);
    }
  if(i!=0 && i===value){
    setShowButtons(false)
    setPlayerover([...playerover,"W"])
    setEvent(0)
    timeoutRef.current = setTimeout(() => {
      setShowButtons(true);
    }, 1000);
    }
  }
    if(turn==="Computer"){
      if(i!=value && value!=4 && value!=6){
    setComputerover([...computerover,value])
  }
    if((value==4 || value==6) && i!=value){
    setShowButtons(false)
    setComputerover([...computerover,value])
    setEvent(value);
    timeoutRef.current = setTimeout(() => {
      setShowButtons(true);
    }, 1000);
    }
  if(i!=0 && i===value){
    setShowButtons(false)
    setComputerover([...computerover,"W"])
    setEvent(0)
    timeoutRef.current = setTimeout(() => {
      setShowButtons(true);
    }, 1000);
    }
  }
  and(i,value)
  }
  const and=(i,value)=>{
   if(turn=="Player"){
     if(overs%6==5 && number==19){
       if(i!=value){
         const updated=playerstats.map((item)=>{
    if(item.name==image.name){
    item.runs+=(playerrun+i)
    }
    return {...item}
  });
  const a=yourteam.map((item)=>{
    if(item.name==image.name){
    item.runs+=(playerrun+i)
    }
    return {...item}})
    setPlayerstats(updated);
     setYourteam(a);
    setTurn("Computer");
    setShow(true);
    setIndex(0);
    setPlayerrun(0);
    setTarget(runs+i+1);
    setPlayeroption(0)
    setComputeroption(0)
    setRuns(0);
    setWickets(0);
    setOvers(0);
    setNumber(0)
    setImage([])
    setId([]);
       }
    if(i===value){
      const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.runs+=playerrun
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.wickets+=1;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.wickets+=1;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.runs+=playerrun
    }
    return {...i}})
    setPlayerstats(updated);
     setOppositionstats(up);
     setYourteam(a);
     setOpposteam(b);
    setTurn("Computer");
    setShow(true);
    setIndex(0);
    setPlayerrun(0);
    setTarget(runs+1);
    setPlayeroption(0)
    setComputeroption(0)
    setRuns(0);
    setWickets(0);
    setOvers(0);
    setNumber(0)
    setImage([])
    setId([]);
    }
     }
  else{
   if(i!=value){
     if(overs%6!=5){
     setPlayerrun(playerrun+i)
     setRuns(runs+i);
     setPlayeroption(i)
     setComputeroption(value)
     setOvers(overs+1);
     }
     if(overs%6==5){
       setIndex((index+1)%10);
              setPlayerrun(playerrun+i)
      setRuns(runs+i);
     setPlayeroption(i)
     setComputeroption(value)
     setOvers(0);
     setNumber(number+1) }
     }
    if(i===value){
  if(wickets==9){
    const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.runs+=playerrun
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.wickets+=1;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.wickets+=1;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.runs+=playerrun
    }
    return {...i}})
    setPlayerstats(updated);
     setOppositionstats(up);
     setYourteam(a);
     setOpposteam(b);
    setTurn("Computer");
    setShow(true);
    setIndex(0);
    setPlayerrun(0);
    setTarget(runs+1);
    setPlayeroption(0)
  setComputeroption(0)
    setRuns(0);
    setWickets(0);
    setOvers(0);
    setNumber(0)
    setImage([])
    setId([]);
  }
  if(wickets<9){
   if(overs%6!=5){
  const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.runs+=playerrun
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.wickets+=1;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.wickets+=1;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.runs+=playerrun
    }
    return {...i}})
    setYourteam(a);
     setOpposteam(b);
     setShow(true);
     setPlayerstats(updated);
     setOppositionstats(up)
     setPlayerrun(0);
     setRuns(runs);
     setWickets(wickets+1);
     setOvers(overs+1);
     setPlayeroption(i)
     setComputeroption(value)
   }
   if(overs%6==5){
  const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.runs+=playerrun
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.wickets+=1;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.wickets+=1;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.runs+=playerrun
    }
    return {...i}})
    setYourteam(a);
     setOpposteam(b);
     setShow(true);
     setPlayerstats(updated);
     setOppositionstats(up)
     setPlayerrun(0);
     setRuns(runs);
     setWickets(wickets+1);
     setIndex((index+1)%10);
     setOvers(0);
     setNumber(number+1) 
    setPlayeroption(i)
     setComputeroption(value)
   }
   }
   }
   }
   }
   if(turn=="Computer"){
     if(number==19 && overs%6==5){
       if(runs+value>=target && value!=i){
         const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=(playerrun+value);
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=(playerrun+value);
    }
    return {...i}
  })
  setOpposteam(b);
  setOppositionstats(up)
  setPlayerrun(playerrun+value)
  setRuns(runs+value);
       setWinner(oppositionplayers[0].team)
       }
    if(runs+value===target-1 && i!=value){
      const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=(playerrun+value);
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=(playerrun+value);
    }
    return {...i}
  })
  setOpposteam(b);
  setOppositionstats(up)
  setPlayerrun(playerrun+value)
  setRuns(runs+value);
       setWinner("Draw");
    }
  if(runs+value<target-1 && i!=value){
    const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=(playerrun+value);
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=(playerrun+value);
    }
    return {...i}
  })
  setOpposteam(b);
  setOppositionstats(up)
  setPlayerrun(playerrun+value)
  setRuns(runs+value);
 setWinner(players[0].team)
  }
  if(i==value){
        if(runs===target-1){
      const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1;
    }
    return {...i}})
  setYourteam(a);
     setOpposteam(b);
  setPlayerstats(updated);
     setOppositionstats(up)
     setWinner("Draw")
     setWickets(wickets+1)
    }
    else{
    const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1;
    }
    return {...i}})
  setYourteam(a);
     setOpposteam(b);
  setPlayerstats(updated);
     setOppositionstats(up)
     setWinner(players[0].team)
     setWickets(wickets+1)
    }
  }
     }
    else{
     if(runs+value>=target && value!=i){
       const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=(playerrun+value);
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=(playerrun+value);
    }
    return {...i}
  })
  setOpposteam(b);
  setOppositionstats(up)
  setPlayerrun(playerrun+value)
  setRuns(runs+value);
       setWinner(oppositionplayers[0].team)
     }
     else{
          if(i!=value){
     if(overs%6!=5){
     setPlayerrun(playerrun+value)
     setRuns(runs+value);
     setPlayeroption(i)
     setComputeroption(value)
     setOvers(overs+1);
     }
     if(overs%6==5){
       setShow(true);
      setPlayerrun(playerrun+value)
      setRuns(runs+value);
     setPlayeroption(i)
     setComputeroption(value)
     setOvers(0);
     setNumber(number+1) }
     }
         if(i===value){
  if(wickets==9){
    if(runs===target-1){
      const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1;
    }
    return {...i}})
  setYourteam(a);
     setOpposteam(b);
  setPlayerstats(updated);
     setOppositionstats(up)
     setWinner("Draw")
     setWickets(wickets+1)
    }
    else{
    const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1;
    }
    return {...i}})
  setYourteam(a);
     setOpposteam(b);
  setPlayerstats(updated);
     setOppositionstats(up)
     setWinner(players[0].team)
     setWickets(wickets+1)
    }
  }
  if(wickets<9){
   if(overs%6!=5){
  const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1;
    }
    return {...i}})
  setYourteam(a);
     setOpposteam(b);
     setIndex(index+1)
     setPlayerstats(updated);
     setOppositionstats(up)
     setPlayerrun(0);
     setRuns(runs);
     setWickets(wickets+1);
     setOvers(overs+1);
    setPlayeroption(i)
     setComputeroption(value)
   }
   if(overs%6==5){
  const updated=playerstats.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1
    }
    return {...i}
  });
  const up=oppositionstats.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun;
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1;
    }
    return {...i}})
  setYourteam(a);
     setOpposteam(b);
     setShow(true);
     setIndex(index+1);
     setPlayerstats(updated);
     setOppositionstats(up)
     setPlayerrun(0);
     setRuns(runs);
     setWickets(wickets+1);
     setOvers(0);
     setNumber(number+1) 
     setPlayeroption(i)
     setComputeroption(value)
   }
   }
   }
     }
   }
  }
  }
  const gone=()=>{
   if(leader==="Player"){
   if(playeroption===computeroption && playeroption!=0){
     bar=bar;
   }
   if(playeroption===0){
     bar=0;
   }
   if(playeroption!==computeroption && playeroption!=0){
     bar=bar+playeroption;
   }
   }
 else if(leader==="Computer"){
   if(playeroption===computeroption && computeroption!=0){
     cbar=0;
   }
      if(computeroption===0){
     cbar=cbar;
   }
   if(playeroption!==computeroption && computeroption!=0){
     cbar=cbar+computeroption;
   }
   }
   
 }
 gone();
  const histwickets = Array.from({ length: 11}, (_, i) => i); 
  const sub_runs=yourteam.filter((it)=>ids.includes(it.name))
const teamA_runs = [0,...sub_runs.sort((a,b)=>ids.indexOf(a.name)-ids.indexOf(b.name)).map((i)=>i.runs)]; // Replace with real data
  const teamB_runs = [0,...opposteam.map((i)=>i.runs)]; // Replace with real data
 // alert(teamA_runs)
const histdata = {
  labels: histwickets, // Overs on X-axis
  datasets: [
    {
      label: players[0].team.toUpperCase(),
      data: teamA_runs,
      borderColor: "rgba(54, 162, 235, 1)", // Blue color
      backgroundColor: "rgba(54, 162, 235, 1)",
      pointBackgroundColor: "rgba(54, 162, 235, 1)",
      pointRadius: 5,
      fill: false,
      tension: 0.3 // Smooth curve effect
    },
    {
      label:oppositionplayers[0].team.toUpperCase(),
      data: teamB_runs,
      borderColor: "rgba(255, 99, 132, 1)", // Red color
      backgroundColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
      pointRadius: 5,
      fill: false,
      tension: 0.3
    }
  ]
};
// Chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: "Wickets Fallen",
        color: "rgb(148, 163, 184)",
        font: { weight: "bold" }
      },
      ticks: {
        color: "rgb(148, 163, 184)",
        font: { weight: "bold" }
      },
      grid: { color: "rgba(148, 163, 184, 0.2)" }
    },
    y: {
      
    title: {
        display: true,
        text: "Total Runs Scored",
        color: "rgb(148, 163, 184)",
        font: { weight: "bold" }
      },
      ticks: {
        color: "rgb(148, 163, 184)",
        font: { weight: "bold" }
      },
      grid: { color: "rgba(148, 163, 184, 0.2)" }
    }
  },
  plugins: {
    legend: {
      labels: {
        font: { weight: "bold" },
        color: "rgb(148, 163, 184)"
      }
    },
    datalabels:{
      color:"transparent"
    }
  }
};
const bardata = {
  labels: histwickets, // Wickets as labels
  datasets: [
    {
      label: players[0].team.toUpperCase(),
      data: teamA_runs,
      backgroundColor: "rgba(54, 162, 235, 0.7)", // Blue color for Team A
      borderWidth: 0
    },
    {
      label: oppositionplayers[0].team.toUpperCase(),
      data: teamB_runs,
      backgroundColor: "rgba(255, 99, 132, 0.7)", // Red color for Team B
      borderWidth: 0
    }
  ]
};

// Chart options
const baroptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: "Wickets Fallen",
        color: "rgb(148, 163, 184)",
        font: { weight: "bold" }
      },
      ticks: {
        color: "rgb(148, 163, 184)",
        font: { weight: "bold" }
      },
      grid: { color: "rgba(148, 163, 184, 0.2)" }
    },
    y: {
      title: {
        display: true,
        text: "Total Runs Scored",
        color: "rgb(148, 163, 184)",
        font: { weight: "bold" }
      },
      ticks: {
        color: "rgb(148, 163, 184)",
        font: { weight: "bold" }
      },
      grid: { color: "rgba(148, 163, 184, 0.2)" }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: "rgb(148, 163, 184)",
        font: { weight: "bold" }
      }
    },
    datalabels:{
      color:"transparent"
    }
  }
};
useEffect(()=>{
  if(playerover.length>6 && turn=="Player"){
   const um=playerover.filter((i,ind)=>ind!=0);
   setPlayerover(um)
  }
},[playerover])
useEffect(()=>{
  if(computerover.length>6 && turn=="Computer"){
   const um=computerover.filter((i,ind)=>ind!=0);
   setComputerover(um)
  }
},[computerover])
  return (
<>
        {showButtons==false && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white pointer-events-none">
          {/* Fireworks Effect */}
          <motion.div
            className="absolute w-full h-full bg-black opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Celebration Text */}
          <motion.div
            className="text-5xl font-bold text-yellow-400 glow-effect"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {event === 4 && "Fantastic Four!"}
            {event === 6 && "Super Six!"}
            {event === 0 && "Wicket Down!"}
          </motion.div>

          {/* Glowing Effect */}
          <motion.div
            className="w-32 h-32 rounded-full bg-yellow-500 opacity-50 absolute"
            initial={{ scale: 0 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1.5, repeat: 2 }}
          />
        </div>
      )}
{showButtons===true && <>
  {winner=='' &&
  <>
  {show===true && <>
  <div className="w-full py-8 flex justify-center">
 {turn==="Player" && <h1 className="text-green-400 text-2xl font-bold shadow-green-400">Choose Your Batsman</h1>  }
 {turn==="Computer" && <h1 className="text-green-400 text-2xl font-bold shadow-green-400">Choose Your Bowler</h1>}
  </div>
    <div className="flex justify-center flex-row flex-wrap gap-4">
    {players.map((i)=>{
    if((!id.includes(i.name) && turn==="Player") || (turn==="Computer" && image.name!=i.name))
      return(
      <>
        <div className="text-center rounded-md bg-black  transition duration-300 ease-in-out transform hover:bg-black hover:scale-105" onClick={()=>add_Player(i)}>
      <div className="flex justify-center items-center">  <img className="w-16 h-16" src={i.image} /></div>
        <p className="text-xs font-bold text-slate-400">{i.name}</p>
        </div>
      </>
      )
    })}
  </div>
  </> }
  { show==false && <>
    <div className="w-full flex flex-row justify-center py-4 gap-40">
    <h1 className="text-slate-400 text-2xl font-bold shadow-slate-400">{players[0].team.toUpperCase()}</h1>
    <h1 className="text-slate-400 text-2xl font-bold shadow-slate-400">{oppositionplayers[0].team.toUpperCase()}</h1>
    </div>
    <div className="w-full flex flex-row justify-center gap-12">
      <div className="text-center rounded-md bg-black  transition duration-300 ease-in-out transform hover:bg-black hover:scale-105">
        <img src={image.image} className="w-36 h-36" />
        <p className="my-2 text-xs font-bold text-slate-400">{image.name}</p>
                <div className="p-4 rounded-b-sm bg-black">
        <p className="text-slate-400 text-2xl font-bold shadow-slate-400">{playeroption}</p> 
        </div>
      </div>
            <div className="text-center rounded-md bg-black  transition duration-300 ease-in-out transform hover:bg-black hover:scale-105">
        <img src={oppositionstats[index].image} className="w-36 h-36" />
        <p className="my-2 text-xs font-bold text-slate-400">{oppositionstats[index].name}</p>
        <div className="p-4 rounded-b-sm bg-black">
        <p className="text-slate-400 text-2xl font-bold shadow-slate-400">{computeroption}</p> 
        </div>
      </div>
    </div>
    
    <div className="flex flex-row flex-wrap justify-center py-12 gap-4">
      {buttons.map((i)=>{
        return(<>
          <div className="px-4 py-4 rounded-full bg-slate-800" onClick={()=>check(i)}>
            <button className="text-xl text-slate-400 font-bold">{i}</button>
          </div>
        </>)
      })}
    </div>
  <div className="flex  flex-row gap-x-4 text-center justify-center">
    {turn=="Player" && <>
      <img src={`Logos/${players[0].team}.webp`} className="w-24 h-24" />
      <div className="flex flex-row text-center items-center justify-center"><p className="text-slate-400 text-2xl font-bold shadow-slate-400">{runs}/{wickets} ({number}.{overs})</p></div>
      </>
      }
      {turn=="Computer" && <>
     <img src={`Logos/${oppositionplayers[0].team}.webp`} className="w-24 h-24" />
      <div className="flex flex-row text-center items-center justify-center"><p className="text-slate-400 text-2xl font-bold shadow-slate-400">{runs}/{wickets} ({number}.{overs})</p></div>
      </>}
      </div>
  {turn==="Computer" && <>
    <div className="flex py-4 flex-row gap-x-4 text-center justify-center">
      <p className="text-slate-400 text-2xl font-bold shadow-slate-400">Target-: {target}</p>
    </div>
  </>}
  {turn=="Player" && playerover.length>0 && <>
 <div className="flex flex-col items-center mt-10">
 <h2 className="text-xs  text-slate-400 font-bold mb-4">Last Six balls</h2>
 <div className=" gap-x-1 text-white rounded-lg  flex items-center px-2">
 <AnimatePresence>
 {playerover.map((ball, index) => 
  {
if(index<6)
return (<>
<motion.div  key={index}  className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold ${  ball === "W" ? "bg-red-500" : (ball === 4 || ball===6) ? "bg-green-500" : "bg-blue-500"  }`}
   initial={{ opacity: 0, scale: 0.5, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0, y: 20 }} transition={{ duration: 0.4 }}>
{ball}
</motion.div>
</>)})}
</AnimatePresence>
</div>
</div>
  </>
  }
    {turn=="Computer" && computerover.length>0 && <>
 <div className="flex flex-col items-center mt-10">
 <h2 className="text-xs text-slate-400 font-bold mb-4">Last Six balls</h2>
 <div className=" gap-x-1 text-white rounded-lg  flex items-center px-2">
 <AnimatePresence>
 {computerover.map((ball, index) => 
  {
 if(index<6)
return (<>
<motion.div  key={index}  className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold ${  ball === "W" ? "bg-red-500" : (ball == 4||ball==6) ? "bg-green-500" : "bg-blue-500"  }`}
   initial={{ opacity: 0, scale: 0.5, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0, y: 20 }} transition={{ duration: 0.4 }}>
{ball}
</motion.div>
</>)})}
</AnimatePresence>
</div>
</div>
  </>
  }
        <div className="w-full flex my-8 flex-row justify-center gap-x-16 gap-y-4 flex-wrap">
  {turn==="Player" &&  <>
    <div className="flex flex-col gap-y-4 justify-center text-center">
    <h1 className="text-slate-400 text-xs font-bold">Current Batsman</h1>
      <div className="w-full flex justify-center"><img className="w-24 h-24" src={players.filter((i)=>i.name===id[id.length-1])[0].image}></img></div>
            <h1 className="text-slate-400 text-xs font-bold">{id[id.length-1]}</h1>
      <h1 className="text-slate-400 text-xs font-bold">Runs-: {playerrun}</h1>
    </div>
  {wickets >0 && 
   <div className="flex flex-col gap-y-4 justify-center text-center">
         <h1 className="text-slate-400 text-xs font-bold">Last Dismissal</h1>
      <div><img className="w-24 h-24" src={players.filter((i)=>i.name===id[id.length-2])[0].image}></img></div>
                  <h1 className="text-slate-400 text-xs font-bold">{id[id.length-2]}</h1>
      <h1 className="text-slate-400 text-xs font-bold">Runs-: {yourteam.filter((i)=>i.name===id[id.length-2]).map((i)=>i.runs)}</h1>
    </div>
  }
  </>
  }
    {turn==="Computer" &&  <>
    <div className="flex flex-col gap-y-4 justify-center text-center">
    <h1 className="text-slate-400 text-xs font-bold">Current Batsman</h1>
      <div className="w-full flex justify-center"><img className="w-24 h-24" src={oppositionstats[index].image}></img></div>
       <h1 className="text-slate-400 text-xs font-bold">{oppositionstats[index].name}</h1>
      <h1 className="text-slate-400 text-xs font-bold">Runs-: {playerrun}</h1>
    </div>
  {wickets >0 && 
   <div className="flex flex-col gap-y-4 justify-center text-center">
         <h1 className="text-slate-400 text-xs font-bold">Last Dismissal</h1>
      <div><img className="w-24 h-24" src={oppositionstats[index-1].image}></img></div>
             <h1 className="text-slate-400 text-xs font-bold">{oppositionstats[index-1].name}</h1>
      <h1 className="text-slate-400 text-xs font-bold">Runs-: {opposteam.filter((i)=>i.name===oppositionstats[index-1].name).map((i)=>i.runs)}</h1>
    </div>
  }
  </>
  }
  </div>
  </>
  }
            <div className="my-8 text-center text-xs" style={{ width: "100%", height: "500px" }} >
     <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Scattering Analysis</h2>
      <Line data={histdata} options={options} />
    </div>
        <div className="my-16 text-center text-xs" style={{ width: "100%", height: "500px" }}>
    <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Bar-Graph Analysis</h2>
      <Bar data={bardata} options={baroptions} />
    </div>
  </>}
  {
    winner!='' && <> <Winner winner={winner} yourteam={yourteam} opposteam={opposteam} />
              <div className="my-8 text-center text-xs" style={{ width: "100%", height: "500px" }} >
     <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Scattering Analysis</h2>
      <Line data={histdata} options={options} />
    </div>
        <div className="my-16 text-center text-xs" style={{ width: "100%", height: "500px" }}>
    <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Bar-Graph Analysis</h2>
      <Bar data={bardata} options={baroptions} />
    </div>
    </>
  }
  </>
}
</>
  );
};


export default PlayerFirst;
