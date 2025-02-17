const express= require('express');
const data= require('../data/Players.json');
const history=require('../data/Details.json');
const result=require('../data/Results.json');
const cors=require('cors');
const app = express();
const router = express.Router();
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const  connectDB = require('../db/config.js');
const { GFGCollection, Collection, ResultCollection }= require('../schemas/index.js');
   const addDataToMongodb = async() => {
     await connectDB();
    await GFGCollection.deleteMany();
    await GFGCollection.insertMany(data);
   await Collection.deleteMany();
    await Collection.insertMany(history);
   await ResultCollection.deleteMany();
    await ResultCollection.insertMany(result);
}
addDataToMongodb();
router.get('/',async(req,res)=>{
  try{
    const data=await GFGCollection.find();
    const details=await Collection.find();
    return res.json({data,details});
  }
  catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/standings',async(req,res)=>{
  try{
    const details=await Collection.find();
    return res.json(details);
  }
  catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/details',async(req,res)=>{
  try {
  const teamname=req.query.team;
        const datas = await Collection.find({teamid:teamname});
        
       return res.json(datas);
   }
   catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/results',async(req,res)=>{
  try{
    const teamId=req.body.team;
    const yourstatus=req.body.yourstatus;
    const oppstatus=req.body.oppstatus;
    const opposteam=req.body.opposteam;
    const info={name:opposteam,status:yourstatus}
    const infos={name:teamId,status:oppstatus};
      await ResultCollection.updateOne({teamid:teamId},
      {
        $push:{
          results:info
          }})
  await ResultCollection.updateOne({teamid:opposteam},
      {
        $push:{
          results:infos
          }})
  }
  catch(err){
    console.log(err);
     res.status(500).send("Internal Server Error");
  }
})
router.get('/results',async(req,res)=>{
  try {
  const teamname=req.query.team;
 const limit = parseInt(req.query.limit)||result.length;
  const offset = parseInt(req.query.offset)||0;  
if(isNaN(limit) && limit<=0){
  return res.status(400).json({error:"Limit must be a positive number."})
}
if(isNaN(offset) && offset<0){
  return res.status(400).json({error:"Offset must be a non-negative number."})
}
        const datas = await ResultCollection.find({teamid:teamname});;
      
       return res.json({
         data:datas[0].results.reverse().slice(offset,limit+offset),
         length:datas[0].results.length
         });
   }
   catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/players',async(req,res)=>{
   try{
     const data=req.body.data;
   const val= data.map(async(i)=>{
      await GFGCollection.updateMany({name:i.name},
      [{
        $set:{
          matches:{ $sum:["$matches",1] },
          runs:{ $sum:["$runs",i.runs] },
          wickets:{ $sum:["$wickets",i.wickets]}
          }}])
        
    });
     
        return res.json({status:"Ok"})
   }
  catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/records',async(req,res)=>{
   try{
     const winner=req.body.winner;
     const loser=req.body.loser;
     const draw=req.body.draw;
     if(draw==false){
   const q=  await Collection.updateMany({teamid:winner[0].team},
      [{
        $set:{
          matches:{ $sum:["$matches",1] },
          win:{ $sum:["$win",1]}
          }}])
      const r=  await Collection.updateMany({teamid:loser[0].team},
      [{
        $set:{
          matches:{ $sum:["$matches",1] },
          lose:{ $sum:["$lose",1]}
          }}])  
  }
  if(draw==true){
  const m=  await Collection.updateMany({teamid:winner[0].team},
      [{
        $set:{
          matches:{ $sum:["$matches",1] }
          }}])
        const v= await Collection.updateMany({teamid:loser[0].team},
      [{
        $set:{
          matches:{ $sum:["$matches",1] }
          }}])  
  }
     
        return res.json({status:"Ok"})
   }
  catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/players',
    async(req, res) => {
            try {
  const teamname=req.query.team;
        const datas = await GFGCollection.find({team:teamname});
       return res.json(datas);
   }
   catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
    });
router.get('/names',
    async(req, res) => {
            try {
  const teamname=req.query.team;
        const datas = await GFGCollection.find({name:teamname});
       return res.json(datas);
   }
   catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
    });
  router.get('/stats',
    async(req, res) => {
            try {
  const teamname=req.query.team;
        const datas = await GFGCollection.find({team:teamname});
       return res.json(datas);
   }
   catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
    });
  module.exports = router;