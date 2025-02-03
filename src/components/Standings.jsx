import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
import {HashLink} from 'react-router-hash-link'
const Standings = () => {
  const [searchParams] = useSearchParams();
  const [items,setItems]=useState([]);
  const [load,setLoad]=useState(true);
  const teamId = searchParams.get("team"); 
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const get_Details=async()=>{
    const res=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/standings`)
    const data=await res.json();
    setItems(data);
    setLoad(false);
  }
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  useEffect(()=>{
    get_Details();
  },[])
  return (
    <>
      <div className="w-full bg-slate-800 border-2 border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex ">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
</div>
{
  load==true && <>
      <div className="flex justify-center items-center py-60">
  <h1 className="text-slate-400 text-xl font-bold">Loading...</h1>
</div>
  </>
}
{
  load===false && <>
  <div className="w-full flex flex-row py-6 justify-center gap-12">
   <div className="w-full flex  justify-center  gap-12" >

       <div className="flex w-16 justify-center items-center border-b-2 border-b-slate-400"> <p className="text-sm font-bold text-slate-400"> Logo </p></div>
      <div className="flex w-24  justify-center items-center border-b-2 border-b-slate-400 "><p className="text-sm font-bold text-slate-400">Name</p></div>
    <div className="flex w-16 justify-center items-center border-b-2 border-b-slate-400"> <p className="text-sm font-bold text-slate-400">Win-ratio </p></div>
   </div>
   </div>
  <div className="w-full flex flex-row flex-wrap justify-center gap-y-8">
    {items.sort((a,b)=>b.win-a.win).map((i,ind)=>{
      return(<>
    <div className="w-full  flex flex-row flex-wrap justify-center p-2 gap-x-16 border-b-2 border-b-slate-400">
    <Link to={`/history?team=${i.teamid}`}>
      <div className="w-16 flex text-center justify-center items-center">   <img src={`Logos/${i.teamid}.webp`} className="w-12 h-12" /></div>
      </Link>
  <div className="flex w-16 justify-center items-center"> <p className="text-sm font-bold text-slate-400">{i.teamid.toUpperCase()}</p></div>
   {i.win>0 && <div className="flex w-20 justify-center items-center"> <p className="text-sm font-bold text-slate-400">{Math.round((i.win/i.matches).toFixed(2)*100)}%</p></div>}
      {i.win==0 && <div className="flex w-16 justify-center items-center"> <p className="text-sm font-bold text-slate-400">0%</p></div>}
      </div>
      </>)
    })}
  </div>
        <footer className="bg-black mt-4 text-white">
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


export default Standings;


