import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
import {HashLink} from 'react-router-hash-link'
const Stats = () => {
  const [searchParams] = useSearchParams();
  const [load,setLoad]=useState(true);
  const [items,setItems]=useState([]);
  const teamId = searchParams.get("team"); 
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const get_Players=async()=>{
    const res=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/players?team=${teamId}`)
    const data=await res.json();
    setItems(data);
    setLoad(false);
  }
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[])
  useEffect(()=>{
    get_Players();
  },[])
  return (
  <>
          <div className="w-full bg-slate-800 border-b border-b-slate-400 border-t-transparent border-l-transparent border-r-transparent flex ">
  <img className="w-24 h-24" src={`Logos/${teamId}.webp`} />
</div>
{
  load==true && <>
      <div className="flex justify-center items-center py-60">
  <h1 className="text-slate-400 text-xl font-bold">Loading...</h1>
</div>
  </>
}
{load==false && <>
  <div className="flex justify-center items-center py-4">
  <h1 className="text-slate-400 text-xl font-bold">Top Batters</h1>
  </div>
  <div className="flex justify-center items-center flex-row flex-wrap gap-12 border-b border-b-slate-400 p-2 border-t-transparent border-l-transparent border-r-transparent">
    {items.sort((a,b)=>b.runs-a.runs).map((i,ind)=>{
    if(ind<=4)
      return(<>
      <Link to={`/profile?name=${i.name}&team=${teamId}`}>
        <div className="text-center rounded-sm bg-black  transition duration-300 ease-in-out transform hover:bg-black hover:scale-105">
    <div className="flex w-full justify-end">
      {i.role!=="Bowler" ? <img className="w-6 h-6" src={`Icons/${i.role}.png`} />:<img className="w-5 h-5" src={`Icons/${i.role}.png`} />}
    </div>
      <div className="flex justify-center items-center"><img className="w-36 h-36"src={i.image} /></div>
    <div className="my-2 w-full flex justify-center flex-col">
   {i.captain===false &&  <p className="text-sm font-bold text-slate-400">{i.name}</p>}
    {i.captain===true &&
      <p className=" text-sm font-bold text-slate-400">{i.name} (C)</p>
    }
        <p className="text-sm font-bold text-slate-400">Runs-: {i.runs}</p>
        </div>
        </div>
        </Link>
      </>)
    })}
  </div>
    <div className="flex justify-center items-center py-4">
  <h1 className="text-slate-400 text-xl font-bold">Top Bowlers</h1>
  </div>
  <div className="flex justify-center items-center flex-row flex-wrap gap-12  flex p-2 ">
    {items.sort((a,b)=>b.wickets-a.wickets).map((i,ind)=>{
    if(ind<=4)
      return(<>
   <Link to={`/profile?name=${i.name}&team=${teamId}`}>
        <div className="text-center rounded-sm bg-black  transition duration-300 ease-in-out transform hover:bg-black  hover:scale-105">
    <div className="flex w-full justify-end">
      {i.role!=="Bowler" ? <img className="w-6 h-6" src={`Icons/${i.role}.png`} />:<img className="w-5 h-5" src={`Icons/${i.role}.png`} />}
    </div>
     <div className="flex justify-center items-center"> <img className="w-36 h-36"src={i.image} /></div>
  <div className="my-2 w-full flex justify-center flex-col">
   {i.captain===false && 
   <p className="text-sm font-bold text-slate-400">{i.name}</p>}
    {i.captain===true &&
      <p className="text-sm font-bold text-slate-400">{i.name} (C)</p>}
<p className="text-sm font-bold text-slate-400">Wickets-: {i.wickets}</p></div>
        </div>
        </Link>
      </>)
    })}
  </div>
      <footer className="bg-black mt-2 text-white">
      <div className="w-full flex justify-center  text-center flex-col p-4 mt-4">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-12">
    <HashLink smooth to='/#about'> <li className="text-gray-400">
       About Us</li></HashLink>
     <HashLink smooth to='/#services'> <li className="text-gray-400">Services</li></HashLink>
     <HashLink smooth to='/#gallery'><li className="text-gray-400">Gallery</li></HashLink>
        </ul>
     </div>
      <div className="w-full flex justify-center  text-center flex-col  mt-4">
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
  </>}
  </>
  );
};


export default Stats;
