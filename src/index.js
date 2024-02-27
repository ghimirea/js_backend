import dotenv from 'dotenv';
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({
  path:'./env'
})


// import { jokes } from "./data.js";
const app = express();

connectDB()
.then(()=>{
  app.on("error", (error)=>{
    console.log("Error: ", error);
    throw error
  })

  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running at port: ${process.env.PORT}`)
  })
})
.catch((err) => {
  console.log('MONGO DB connection Failed !!!', err)
})

