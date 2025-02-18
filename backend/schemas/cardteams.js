const mongoose=require('mongoose');
const cardteamSchema = new mongoose.Schema({
       team: { type: String, required: true },
       matches: { type:Number, required: true},
       win:{ type:Number, required: true },
       lose:{ type:Number, required: true }
    });
const Cardteams = mongoose.model("cardteams", cardteamSchema);
module.exports=Cardteams;