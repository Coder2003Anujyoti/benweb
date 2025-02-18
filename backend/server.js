const express = require('express');
const bodyParser = require('body-parser');
const iplRoutes = require('./files/ipl.js');
const cors=require('cors');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(cors({
  origin:"*"
}));
app.use(iplRoutes);
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});