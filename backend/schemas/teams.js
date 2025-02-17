const mongoose=require('mongoose');
const detailSchema = new mongoose.Schema({
       teamid: {type:String,required:true},
       team: { type: String, required: true },
       matches: { type:Number, required: true},
       win:{ type:Number, required: true },
       lose:{ type:Number, required: true },
       trophies:{ type:Number, required: true},
       site: { type:String, required:true },
       about:{ type:String, required: true },
    });
const Collection = mongoose.model("Teams", detailSchema);
module.exports= Collection;