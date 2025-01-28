const express = require('express');
const data= require('./Players.json');
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
app.use(cors({
  origin:"*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.get('/players',
    async(req, res) => {
            try {
  const teamname=req.query.team;
        const datas = await GFGCollection.find({team:teamname});
        console.log(datas)
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