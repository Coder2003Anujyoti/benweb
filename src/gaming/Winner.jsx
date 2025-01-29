import React,{useState,useEffect} from "react";


const Winner = ({winner,yourteam,opposteam}) => {
  const [load,setLoad]=useState(true);
  const array=yourteam.concat(opposteam);
  const send_data=async()=>{
    const response=await fetch("https://prepared-josy-handcricket-0e7a326f.koyeb.app/players", {
    method: "POST",
    body: JSON.stringify({data:array}),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 const value=await response.json();
 if(value.status==="Ok"){
 setLoad(false);
 }
  }
  useEffect(()=>{
   send_data()
  },[])
  return (
    <>
   {
  load==true && <>
      <div className="flex justify-center items-center py-60">
  <h1 className="text-slate-400 text-2xl font-bold">Loading...</h1>
</div>
  </>
}
{ load==false && <>
    {winner!=='Draw' && 
  <>
  <div className="w-full py-4 flex justify-center">
     <h1 className="text-sm font-extrabold text-yellow-400">Winner</h1> 
    </div>
      <div className="w-full py-4 flex justify-center">
<img src={`Logos/${winner}.webp`} className="w-24 h-24" />
    </div>
    </>
  }
  {
    winner==="Draw" && <>
        <div className="w-full py-20 flex justify-center">
     <h1 className="text-2xl font-extrabold text-yellow-400">Draw</h1> 
    </div>
    </>
  }
  <div className="w-full py-4 flex justify-center">
    <h1 className="text-xl font-extrabold text-slate-400">Top Batters</h1>
  </div>
  <div className="w-full flex flex-col justify-center gap-4 ">
    
    {
      array.sort((a,b)=>b.runs-a.runs).map((i,ind)=>{
      if(ind<=2)
        return(<>
 <div className="w-full flex flex-row flex-wrap justify-evenly border-2 p-4 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent">
   <img src={i.image} className="w-20 h-20"/>
  <div className="flex justify-center items-center"><h2 className="text-lg font-extrabold text-slate-400 ">{i.name}</h2></div>
    <div className="flex justify-center items-center"> <h2 className="text-lg font-extrabold text-slate-400 ">Runs-:{i.runs}</h2></div>
   </div>
        </>)
      })
    }
    </div>
    <div className="w-full py-8 flex justify-center">
    <h1 className="text-xl font-extrabold text-slate-400">Top Bowlers</h1>
  </div>
  <div className="w-full flex flex-col justify-center gap-4 ">
    {
      array.sort((a,b)=>b.wickets-a.wickets).map((i,ind)=>{
      if(ind<=2)
        return(<>
 <div className="w-full flex flex-row flex-wrap justify-evenly border-2 p-4 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent">
   <img src={i.image} className="w-20 h-20"/>
  <div className="flex justify-center items-center"><h2 className="text-lg font-extrabold text-slate-400 ">{i.name}</h2></div>
    <div className="flex justify-center items-center"> <h2 className="text-lg font-extrabold text-slate-400 ">Wickets-:{i.wickets}</h2></div>
   </div>
        </>)
      })
    }
    </div>
    
</>
}
  </>
  );
};


export default Winner;