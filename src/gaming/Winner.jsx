import React,{useState,useEffect} from "react";
const Winner = ({winner,yourteam,opposteam}) => {
  const [load,setLoad]=useState(true);
  const array=yourteam.concat(opposteam);
  const playerdata=yourteam;
const computerdata= opposteam;
const playertotal=playerdata.reduce((total,i)=>{
  total+=(i.runs);
  return total;
},0)
const computertotal=computerdata.reduce((total,i)=>{
  total+=(i.runs);
  return total;
},0)
const playerwickets=computerdata.reduce((total,i)=>{
  total+=(i.wickets);
  return total;
},0)
const computerwickets=playerdata.reduce((total,i)=>{
  total+=(i.wickets);
  return total;
},0)
  const send_data=async(datas,gatas)=>{
    const [res,ress]=await Promise.all([fetch("https://prepared-josy-handcricket-0e7a326f.koyeb.app/players", {
    method: "POST",
    body: JSON.stringify(datas),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
}),fetch("https://prepared-josy-handcricket-0e7a326f.koyeb.app/records", {
    method: "POST",
    body: JSON.stringify(gatas),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})]) ;
 const value=await res.json();
 const values=await ress.json();
 if(value.status==="Ok" && values.status==="Ok"){
 setLoad(false);
 }
  }
  useEffect(()=>{
  if(winner===yourteam[0].team){
   send_data({data:array},{winner:yourteam,loser:opposteam,draw:false})
  }
 else if(winner===opposteam[0].team){
   send_data({data:array},{winner:opposteam,loser:yourteam,draw:false})
  }
  else{
    send_data({data:array},{winner:yourteam,loser:opposteam,draw:true})
  }
  
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
 <div className="w-full flex justify-center items-center py-12">
     <button className="p-4 rounded-lg text-lg text-slate-400 font-bold bg-slate-800">Match Summary</button>
   </div>
  <div className="w-full flex justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Scorecard</h1>
   </div>
   <div className="w-full flex flex-row justify-center gap-4">
     <div className="flex p-4 flex-row gap-4">
       <img src={`Logos/${playerdata[0].team}.webp`} className="w-16 h-16" />
     <div className="flex justify-center items-center text-center"><p className="text-lg font-bold text-slate-400">{playertotal}/{playerwickets}</p></div>
     </div>
          <div className="flex p-4 flex-row gap-4">
     <div className="flex justify-center items-center text-center"><p className="text-lg font-bold text-slate-400">{computertotal}/{computerwickets}</p></div>
     <img src={`Logos/${computerdata[0].team}.webp`} className="w-16 h-16" />
     </div>
   </div>
     <div className="w-full flex justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Performance</h1>
   </div>
   <div className="flex p-4 flex-row justify-center gap-4">
       <img src={`Logos/${playerdata[0].team}.webp`} className="w-16 h-16" />
     <div className="flex justify-center items-center text-center"><p className="text-lg font-bold text-slate-400">{playertotal}/{playerwickets}</p></div>
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       playerdata.map((i)=>{
         return(<>
           <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-sm font-bold">{i.name}</p>
  <p className="text-slate-400 text-sm font-bold">Runs-:{i.runs}</p>
  <p className="text-slate-400 text-sm font-bold">Wickets-:{i.wickets}</p>
           </div>
         </>)
       })
     }
     </div>
  <div className="flex p-4 flex-row justify-center gap-4">
       <img src={`Logos/${computerdata[0].team}.webp`} className="w-16 h-16" />
     <div className="flex justify-center items-center text-center"><p className="text-lg font-bold text-slate-400">{computertotal}/{computerwickets}</p></div>
     </div>
   <div className="w-full flex p-4 flex-wrap flex-row justify-center gap-2">
     {
       computerdata.map((i)=>{
         return(<>
           <div className="p-4 flex flex-col gap-1 rounded-lg bg-slate-800 text-center justify-center items-center transition duration-300 ease-in-out transform hover:bg-slate-800  hover:scale-105">
    <div className="flex justify-center items-center"><img src={i.image} className="w-16 h-16" /></div>
    <p className="text-slate-400 text-sm font-bold">{i.name}</p>
  <p className="text-slate-400 text-sm font-bold">Runs-:{i.runs}</p>
  <p className="text-slate-400 text-sm font-bold">Wickets-:{i.wickets}</p>
           </div>
         </>)
       })
     }
     </div>
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