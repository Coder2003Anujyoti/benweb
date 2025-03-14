const express = require('express');
const bodyParser = require('body-parser');
const iplRoutes = require('./files/ipl.js');
const cors=require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(cors({
  origin:"*"
}));
app.use(iplRoutes);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});