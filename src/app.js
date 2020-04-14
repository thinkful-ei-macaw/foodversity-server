require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

//routes here
//food, days
//the food entry goes into each day, like the notes app
const daysRouter = require ('./days-router');
const foodRouter = require ('./food-router');
const data = require ('./app-data');
const userId = require ('./users-login');
//middle ware
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//route middleware
// app.use('/days', daysRouter);
//app.use('/food', foodRouter);


app.get("/", (req, res) => {
  res.status(200).send("I am serving, I am a server!");
});

app.get('/main', (req, res) => {
  res.json(data);
});


app.get ('/login', (req, res) => {
  // const login = {
  //   title: 'login page',
  //   content: 'login form'
  // }
  res.json(userId);
})

//post method
app.get ('/addform', (req, res) => {
  const addform = {
    title: 'add form',
    content:'enter your food here'
  }
  res.json(addform);
})



//error handling
const errorHandler = (error, req, res, next) => {
  let response;
  console.log(error.message);
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    
    response = { message: error.message, error };
  }
  res.status(500).json(response);
};
app.use(errorHandler); 

module.exports = app;

