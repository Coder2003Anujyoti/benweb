import React,{useState,useEffect} from "react";
import {HashLink} from 'react-router-hash-link'
import {useSearchParams,Link} from "react-router-dom"
const Card = () => {
  const [searchParams] = useSearchParams();
  const [load,setLoad]=useState(true);
  const [items,setItems]=useState([]);
  const teamId = searchParams.get("team"); 
  const team = searchParams.get("name");
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const get_Player=async()=>{
    const res=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/names?team=${team}`)
    const data=await res.json();
    setLoad(false);
    setItems(data);
  }
  useEffect(()=>{
    get_Player();
  },[])
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  return (
    <>
{
  load==true && <>
    <div className="w-full flex flex-col items-center justify-center py-40">
    <img src="Logos/Logo.webp" className="w-30 h-24" />
   <div className="w-full flex justify-center gap-y-2  text-center flex-col p-4 mt-4">

    <div className="mt-4 flex flex-row flex-wrap justify-center gap-x-12 gap-y-12 ">
  {new Array(4).fill("").map((i,ind)=>{
  return(
  <div className="text-center">
    <img src={`sponsor/sponsor${ind+1}.png`} className="w-22 h-14"></img>
    </div>
    )
  })}
</div>
    </div>
    </div>
  </>
}
{
  load==false &&
  <>
   <div className="w-full bg-slate-800 border-b border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex ">
   <Link  to={`/details?team=${teamId}`}>
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
  </Link>
</div>
  <div className="w-full flex flex-col justify-center items-center gap-y-4">
  <div className="w-full flex flex-row justify-center items-center">
  <div className="flex justify-center items-center">
    <img src={items[0].image} className="w-64 h-64" />
    </div>
    </div>
      <div className="w-full  flex flex-col flex-wrap justify-center items-center">
      <div className="text-center flex flex-row justify-center items-center">
   {items[0].captain==false && <h1 className="text-lg font-bold text-slate-400">Name-: {items[0].name} </h1>}
      {items[0].captain==true && <h1 className="text-lg font-bold text-slate-400">Name-: {items[0].name} (C)</h1>}
  </div>
        <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Role-: {items[0].role}</h1>
  </div>
          <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Matches-: {items[0].matches}</h1>
  </div>
  <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Runs-: {items[0].runs}</h1>
  </div>
        <div className="text-center flex flex-row justify-center items-center">
   <h1 className="text-lg font-bold text-slate-400">Wickets-: {items[0].wickets}</h1>
  </div>
  </div>
  <div className="text-center flex flex-row justify-center items-center">
  <Link to={`/history?team=${teamId}`} >
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
  </Link>
  </div>
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
         <HashLink smooth to={`/history?team=${i}`}><li><img className="w-12 h-12" src={`Logos/${i}.webp`}/></li></HashLink>
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
  )
};

export default Card;
