const mongoose=require('mongoose');
const gfgSchema = new mongoose.Schema({
       name: {type:String,required:true},
       image: { type: String, required: true },
       role: { type: String, required: true },
       team:{ type: String, required: true },
       captain:{ type:Boolean, required: true},
     matches:{ type:Number, required: true },
       runs:{ type:Number, required: true },
       wickets:{ type:Number, required: true },
    });
const GFGCollection = mongoose.model("Players", gfgSchema);
module.exports=GFGCollection;