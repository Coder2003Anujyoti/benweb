const mongoose = require('mongoose');
const cardsSchema = new mongoose.Schema({
   team: {type:String,required:true},
   name: { type: String, required: true },
  image: { type: String, required: true },
  bat: { type: Number, required: true },
  ball: { type: Number, required: true},
  runs: {type: Number, required: true}
});
const CardsCollection = mongoose.model("cards", cardsSchema);
module.exports=CardsCollection;