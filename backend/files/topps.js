const express = require('express');
const router = express.Router();
const players=require('../data/Cards.json');
const mongoose = require('mongoose');
const  connectDB = require('../db/config.js');
const CardsCollection = require('../schemas/server.js');
const cors=require('cors');
const app = express();
 const addDataToMongodb = async() => {
   await connectDB();
 await CardsCollection.deleteMany();
await CardsCollection.insertMany(players);
}
addDataToMongodb();
router.get('/cards',async(req,res)=>{
  try{
    const data=await CardsCollection.find();
    return res.json(data);
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

module.exports = router;