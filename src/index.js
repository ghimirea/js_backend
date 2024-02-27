import dotenv from 'dotenv';
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
  path:'./env'
})


// import { jokes } from "./data.js";
const app = express();
// const port = process.env.port || 3000;

connectDB()

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.get("/api/jokes", (req, res) => {
//   res.send(jokes);
// });

// app.get("/twitter", (req, res) => {
//   res.send("I am in");
// });

// app.get("/login", (req, res) => {
//   res.send("<h1>Please login</h1>");
// });

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });
