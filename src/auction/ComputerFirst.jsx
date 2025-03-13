import React,{useState,useEffect} from "react";
import Winner from "./Winner.jsx"
import { Line,Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale,LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend,ArcElement);
var bar=0;
var cbar=0;
var sbar=0;
const ComputerFirst = ({players,oppositionplayers}) => {
  const [show,setShow]=useState(true);
  const [turn,setTurn]=useState("Computer");
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
    setLeader(turn);
    setPlayeroption(0);
    setComputeroption(0)
    setIds([...ids,i.name])
    setImage(i);
    setId([...id,i.name])
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
   if(turn=="Player"){
     if(number==19 && overs%6==5){
       if(runs+i>=target && value!=i){
         const up=playerstats.map((item,ind)=>{
    if(item.name==image.name){
      item.runs+=(playerrun+i);
    }
    return {...item}
  })
  const b=yourteam.map((item,ind)=>{
    if(item.name==image.name){
      item.runs+=(playerrun+i);
    }
    return {...item}
  })
  setYourteam(b);
  setPlayerstats(up)
  setPlayerrun(playerrun+i)
  setRuns(runs+i);
       setWinner(players[0].team)
       }
    if(runs+i===target-1 && i!=value){
      const up=playerstats.map((item,ind)=>{
    if(item.name==image.name){
      item.runs+=(playerrun+i);
    }
    return {...item}
  })
  const b=yourteam.map((item,ind)=>{
    if(item.name==image.name){
      item.runs+=(playerrun+i);
    }
    return {...item}
  })
  setYourteam(b);
  setPlayerstats(up)
  setPlayerrun(playerrun+i)
  setRuns(runs+i);
       setWinner("Draw");
    }
  if(runs+i<target-1 && i!=value){
    const up=playerstats.map((item,ind)=>{
    if(item.name==image.name){
      item.runs+=(playerrun+i);
    }
    return {...item}
  })
  const b=yourteam.map((item,ind)=>{
    if(item.name==image.name){
      item.runs+=(playerrun+i);
    }
    return {...item}
  })
  setYourteam(b);
  setPlayerstats(up)
  setPlayerrun(playerrun+i)
  setRuns(runs+i);
 setWinner(oppositionplayers[0].team)
  }
  if(i==value){
        if(runs===target-1){
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
    i.runs+=playerrun;
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
    i.runs+=playerrun;
    }
    return {...i}})
  setYourteam(a);
     setOpposteam(b);
  setPlayerstats(updated);
     setOppositionstats(up)
     setWinner(oppositionplayers[0].team)
     setWickets(wickets+1)
    }
     }
     }
     else{
     if(runs+i>=target && value!=i){
       const up=playerstats.map((item,ind)=>{
    if(item.name==image.name){
      item.runs+=playerrun+i;
    }
    return {...item}
  })
  const b=yourteam.map((item,ind)=>{
    if(item.name==image.name){
      item.runs+=playerrun+i;
    }
    return {...item}
  })
  setYourteam(b);
  setPlayerstats(up)
  setPlayerrun(playerrun+i)
  setRuns(runs+i);
       setWinner(players[0].team)
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
    if(runs===target-1){
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
    i.runs+=playerrun;
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
    i.runs+=playerrun;
    }
    return {...i}})
  setYourteam(a);
     setOpposteam(b);
  setPlayerstats(updated);
     setOppositionstats(up)
     setWinner(oppositionplayers[0].team)
     setWickets(wickets+1)
    }
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
    setPlayeroption(i)
     setComputeroption(value)
     setPlayerrun(0);
     setRuns(runs);
     setWickets(wickets+1);
     setOvers(overs+1);
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
     setPlayeroption(i)
     setComputeroption(value)
     setPlayerrun(0);
     setRuns(runs);
     setWickets(wickets+1);
     setIndex((index+1)%10);
     setOvers(0);
     setNumber(number+1) 
   }
   }
   }
   }
   }
   }
   if(turn=="Computer"){
     if(overs%6==5 && number==19){
       if(i!=value){
         const updated=oppositionstats.map((item,ind)=>{
    if(ind===index){
    item.runs+=(playerrun+value)
    }
    return {...item}
  });
  const a=opposteam.map((item,ind)=>{
    if(ind===index){
    item.runs+=(playerrun+value)
    }
    return {...item}})
    setOppositionstats(updated);
     setOpposteam(a);
    setTurn("Player");
    setShow(true);
    setIndex(0);
    setPlayerrun(0);
    setTarget(runs+value+1);
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
      const updated=oppositionstats.map((i,ind)=>{
    if(ind===index){
    i.runs+=playerrun
    }
    return {...i}
  });
  const up=playerstats.map((i,ind)=>{
    if(i.name===image.name){
      i.wickets+=1;
    }
    return {...i}
  })
  const b=opposteam.map((i,ind)=>{
    if(ind==index){
      i.runs+=playerrun
    }
    return {...i}
  })
  const a=yourteam.map((i)=>{
    if(i.name==image.name){
    i.wickets+=1;
    }
    return {...i}})
    setPlayerstats(up);
     setOppositionstats(updated);
     setYourteam(a);
     setOpposteam(b);
    setTurn("Player");
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
    i.wickets+=1
    }
    return {...i}})
    setPlayerstats(updated);
     setOppositionstats(up);
     setYourteam(a);
     setOpposteam(b);
    setTurn("Player");
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
  return (
<>
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
     :<img src={`Logos/${oppositionplayers[0].team}.webp`} className="w-24 h-24" />
      <div className="flex flex-row text-center items-center justify-center"><p className="text-slate-400 text-2xl font-bold shadow-slate-400">{runs}/{wickets} ({number}.{overs})</p></div>
      </>}
      </div>
  {turn==="Player" && <>
    <div className="flex py-4 flex-row gap-x-4 text-center justify-center">
      <p className="text-slate-400 text-2xl font-bold shadow-slate-400">Target-: {target}</p>
    </div>
  </>}
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
  </>}
  {
    winner!='' && <Winner winner={winner} yourteam={yourteam} opposteam={opposteam} />
  }
            <div className="my-4 text-center text-xs" style={{ width: "100%", height: "500px" }} >
     <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Scattering Analysis</h2>
      <Line data={histdata} options={options} />
    </div>
        <div className="my-16 text-center text-xs" style={{ width: "100%", height: "500px" }}>
    <h2 className="text-slate-400 text-xs font-bold mb-4 text-center">Bar-Graph Analysis</h2>
      <Bar data={bardata} options={baroptions} />
    </div>
</>
  );
};


export default ComputerFirst;

