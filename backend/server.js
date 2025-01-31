const express = require('express');
const data= require('./Players.json');
const history=require('./Details.json');
const app = express();
const port = process.env.PORT || 8000;
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const URL = 'mongodb+srv://anujyotide:cr7FUgn1CxHAHUxo@benapi.x6nes.mongodb.net/Gaming?retryWrites=true&w=majority';
const connectionParams={ useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(URL,connectionParams)
    .then(() => { console.log("Connected to the database");
    addDataToMongodb();
    }).catch((err)=>{console.log(err)})
    async function addDataToMongodb() {
    await GFGCollection
        .deleteMany();
    await GFGCollection
        .insertMany(data);
   await Collection
        .deleteMany();
    await Collection
        .insertMany(history);  
    console.log("Data added to MongoDB");
}
const gfgSchema = new mongoose
    .Schema({
       name: {type:String,required:true},
       image: { type: String, required: true },
       role: { type: String, required: true },
       team:{ type: String, required: true },
       captain:{ type:Boolean, required: true },
       runs:{ type:Number, required: true },
       wickets:{ type:Number, required: true },
    });
    const GFGCollection = mongoose
    .model("Players", gfgSchema);
const detailSchema = new mongoose
    .Schema({
       teamid: {type:String,required:true},
       team: { type: String, required: true },
       matches: { type:Number, required: true },
       win:{ type:Number, required: true },
       lose:{ type:Number, required: true },
       trophies:{ type:Number, required: true },
       site: { type:String, required:true },
       about:{ type:String, required: true },
    });
    const Collection = mongoose
    .model("Teams", detailSchema);
app.use(cors({
  origin:"*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.get('/',async(req,res)=>{
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
app.get('/details',async(req,res)=>{
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
app.post('/players',async(req,res)=>{
   try{
     const data=req.body.data;
     const winner=req.body.winner;
     const loser=req.body.loser;
     const draw=req.body.draw;
   const val= data.map(async(i)=>{
      await GFGCollection.updateMany({name:i.name},
      [{
        $set:{
          runs:{ $sum:["$runs",i.runs] },
          wickets:{ $sum:["$wickets",i.wickets]}
          }}])
        
    });
  if(draw==false){
   const q=  await Collection.updateOne({teamid:winner[0].team},
      [{
        $set:{
          matches:{ $sum:["$matches",1] },
          win:{ $sum:["$win",1]}
          }}])
      const r=  await Collection.updateOne({teamid:loser[0].team},
      [{
        $set:{
          matches:{ $sum:["$matches",1] },
          lose:{ $sum:["$lose",1]}
          }}])  
  }
  else{
  const m=  await Collection.updateOne({teamid:winner[0].team},
      {
        $set:{
          matches:{ $sum:["$matches",1] }
          }})
        const v= await Collection.updateOne({teamid:loser[0].team},
      {
        $set:{
          matches:{ $sum:["$matches",1] }
          }})  
  }
     
        return res.json({status:"Ok"})
   }
  catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
app.get('/players',
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
    app.get('/stats',
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
  app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });