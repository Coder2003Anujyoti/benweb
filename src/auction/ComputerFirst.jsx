import React,{useState,useEffect} from "react";
import Winner from "./Winner.jsx"
const ComputerFirst = ({players,oppositionplayers}) => {
  const [show,setShow]=useState(true);
  const [turn,setTurn]=useState("Computer");
  const [playeroption,setPlayeroption]=useState(0);
  const [computeroption,setComputeroption]=useState(0)
  const [id,setId]=useState([]);
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
    setImage(i);
    setId([...id,i.name])
    setPlayerstats(players);
    setOppositionstats(oppositionplayers)
    setShow(false);
  }
  const check=(i)=>{
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
  </>
    
  }
  </>}
  {
    winner!='' && <Winner winner={winner} yourteam={yourteam} opposteam={opposteam} />
      
      
  }
</>
  );
};


export default ComputerFirst;

