const express = require('express');
const router = express.Router();
const players=require('../data/Cards.json');
const teams=require('../data/Teams.json');
const mongoose = require('mongoose');
const  connectDB = require('../db/config.js');
const { CardsCollection,Cardteams }= require('../schemas/server.js');
const cors=require('cors');
const app = express();
 const addDataToMongodb = async() => {
   await connectDB();
 await CardsCollection.deleteMany();
await CardsCollection.insertMany(players);
await Cardteams.deleteMany();
await Cardteams.insertMany(teams);
}
addDataToMongodb();
router.get('/cards',async(req,res)=>{
  try{
    const data=await CardsCollection.find();
    const info=await Cardteams.find();
    return res.json({players:data,teams:info});
  }
  catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/card',async(req,res)=>{
  try{
    const name=req.query.team;
    const data=await CardsCollection.find({team:name});
    return res.json(data);
  }
  catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/team',async(req,res)=>{
  try{
    const data=await Cardteams.find();
    return res.json(data);
  }
  catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;