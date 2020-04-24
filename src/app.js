require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";
const daysRouter = require("./days-router");
const foodsRouter = require("./food-router");
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users-router");

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use("/api/auth", authRouter);

//route middleware

app.use("/days", daysRouter);
app.use("/food", foodsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.status(200).send("I am serving, I am a server!");
});

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
