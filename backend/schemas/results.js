const mongoose=require('mongoose');
const resultSchema = new mongoose.Schema({
       teamid: {type:String,required:true},
       team: { type: String, required: true },
       results: { type: Array, required: true}
    });
    const ResultCollection = mongoose.model("Results",resultSchema);
module.exports= ResultCollection;