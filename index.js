const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

dotenv.config();

//Connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECT, 
  { useNewUrlParser: true }, 
  () => console.log('connected to db!')
);

//Import Routes
const authRoute = require("./routes/auth");
const privateRoute = require("./routes/private");

//Middleware 
app.use(express.json());
//Route Middleware 
app.use('/api/user', authRoute);
app.use('/api/private', privateRoute);


//Models for our data
//mongodb+srv://kisha-mavryck:<password>@cluster-jwt-tutorial-gb4fh.mongodb.net/test?retryWrites=true&w=majority

//Start Server
app.listen(4000, () => console.log('Server Up & Running'));
