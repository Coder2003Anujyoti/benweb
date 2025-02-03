import React,{useState,useEffect} from "react";
import {useSearchParams,Link} from "react-router-dom"
import {HashLink} from 'react-router-hash-link'
const History = () => {
  const [searchParams] = useSearchParams();
  const [items,setItems]=useState([]);
  const [load,setLoad]=useState(true);
  const teamId = searchParams.get("team"); 
  const teams=["Mi","Csk","Rr","Kkr","Gt","Pbks","Rcb","Lsg","Dc","Srh"];
  const get_Details=async()=>{
    const res=await fetch(`https://prepared-josy-handcricket-0e7a326f.koyeb.app/details?team=${teamId}`)
    var data=await res.json();
    setItems(data);
    setLoad(false);
  }
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "smooth" });
    get_Details();
  },[teamId])
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
  <div className="w-full flex flex-col">
    <div className="w-full py-8 flex-col flex justify-center items-center text-center"><img src={`Logos/${teamId}.webp`} 
    className="w-36 h-36"/>
  <div className="w-full  flex-row flex justify-center"><p className="text-lg text-slate-400 font-bold">{items[0].team}</p></div>
  {items[0].trophies>0 && <div className="w-full  flex-row flex justify-center gap-2 p-2">{new Array(items[0].trophies).fill(1).map((i)=>{
      return(<>
        <img src="Icons/trophy.png" className="w-6 h-6" />
      </>)
    })}
    </div>}
   <div className="border-2 border-b-slate-400 w-full border-l-transparent border-r-transparent border-t-transparent py-2 flex-col items-center flex-wrap flex gap-2  justify-center"><p className="text-sm text-slate-400 font-bold">Matches-: {items[0].matches}</p>
   <p className="text-sm text-slate-400 font-bold">Win-: {items[0].win}</p>
      <p className="text-sm text-slate-400 font-bold">Lose-: {items[0].lose}</p>
    {items[0].win>0 &&   <p className="text-sm text-slate-400 font-bold">Win-Ratio-: {Math.round((items[0].win/items[0].matches).toFixed(2)*100)}%</p>}
    {items[0].win==0 &&   <p className="text-sm text-slate-400 font-bold">Win-Ratio-: 0%</p>}
   </div>
  <div className="w-full py-2 flex-col flex justify-center border-2 border-b-slate-400
  border-l-transparent border-r-transparent border-t-transparent items-center text-center">
    <h3 className="text-lg text-slate-400 font-bold">About</h3>
    <div className="w-full py-2 flex-row items-center flex-wrap flex text-center  justify-center"> <p className="ml-2 mr-2 text-xs text-slate-400 font-bold">{items[0].about}</p></div>
  </div>
    <div className="w-full py-2 flex-col flex justify-center items-center text-center">
    <div className="w-full py-4 flex-col items-center flex-wrap flex  justify-center"> <a href={items[0].site} target="_blank"><button className="text-sm text-white font-extrabold p-4 bg-orange-600 rounded-bl-lg rounded-tl-lg rounded-tr-lg">Official Site</button></a></div>
  </div>
  
        </div>
        </div>
            <footer className="bg-black text-white">
      <div className="w-full flex justify-around text-center flex-row flex-wrap">
        <p className="mt-2 ml-2 mr-2 text-gray-400">Explore team rosters, player stats, and dive deep into the rich history of IPL.Thank you for being part of the IPL family—let the game begin!</p>
      </div>
      <div className="w-full flex justify-center  text-center flex-col mt-4">
        <h2 className="text-xl font-semibold">Quick Links</h2>
        <ul className="mt-4 flex flex-row flex-wrap justify-center gap-x-12">
    <HashLink smooth to='/#about'> <li className="text-gray-400 hover:text-white">
       About Us</li></HashLink>
     <HashLink smooth to='/#services'> <li className="text-gray-400 hover:text-white">Services</li></HashLink>
     <HashLink smooth to='/#gallery'><li className="text-gray-400 hover:text-white">Gallery</li></HashLink>
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
    <div class="border-t border-gray-700 mt-4 p-2 text-center text-gray-400">
      © 2025 Coder2003Anujyoti All rights reserved.
    </div>

</footer>
  </>
}
    </>
  );
};


export default History;

