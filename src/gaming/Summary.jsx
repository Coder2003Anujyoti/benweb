import React from "react";
import {useSearchParams,Link} from "react-router-dom"
const Summary = () => {
const [searchParams] = useSearchParams();
const player = searchParams.get("player");
const computer= searchParams.get("computer");
const playerdata=JSON.parse(decodeURIComponent(player));
const computerdata=JSON.parse(decodeURIComponent(computer));
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
  return (
    <>
    <div className="w-full flex justify-center items-center py-12">
   <h1 className="text-lg font-bold text-slate-400"> Match Summary</h1>
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
   </>
  );
};

export default Summary;
