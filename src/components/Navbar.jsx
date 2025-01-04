import React,{useState,useEffect} from "react";
function Navbar(){
  const [datas,setDatas]=useState([]);
   const [text,setText]=useState("");
   const [load,setLoad]=useState(false);
   const api=async()=>{
     const res=await fetch(`https://ben10-website.onrender.com/aliens?name=${text}`);
     const data =await res.json();
     setDatas(data);
     setLoad(true);
   }
   useEffect(()=>{
     api();
   },[text])
   
   
  return(<>
    <div className="w-full h-16 bg-green-600 flex items-center gap-x-6 md:gap-x-64">
      <div>
        <img src="images/Ben.png" className="w-16 h-16 m-2"/>
      </div>
      <div>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Search for aliens..." className="m-4 md:w-96 bg-black rounded-md text-slate-100" />
      </div>
    </div>
    <div className="my-2">
    {load==false && <>
      <div className=" w-full flex  justify-center align-center my-48  md:my-32">
      <h1 className="font-bold " >Page is Loading...</h1>
      </div>
    </>}  
    <div className=" flex justify-around flex-wrap gap-y-4 md:flex md:flex-row md:flex-wrap  md:justify-start md:mx-16 md:gap-x-2">
      {datas.map((alien) => (
        <div className="bg-white rounded-lg text-center p-1 border shadow-lg shadow-green-500/30 hover:scale-105 font-bold hover:ease-in-out duration-300 md:p-4 md:max-h-fit"  key={alien.id}>
          <img className="h-40 w-32"
            src={Array.from(alien.image).reverse().slice(33).reverse().join("")}
            alt={alien.name}
         
          />
          <p className="my-2">{alien.name}</p>
        </div>
      ))}
    </div>
   {datas.length==0 && text!="" &&
   <>
     <div className=" w-full flex  justify-center align-center my-48  md:my-32">
   <h1 className=" font-bold">No Aliens</h1>
  </div>
  </>}
    </div>
  </>);
}
export default Navbar;