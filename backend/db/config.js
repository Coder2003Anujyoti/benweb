const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGO_URI="mongodb+srv://anujyotide:cr7FUgn1CxHAHUxo@benapi.x6nes.mongodb.net/Gaming?retryWrites=true&w=majority"
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
module.exports = connectDB;