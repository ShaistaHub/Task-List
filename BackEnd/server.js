import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import taskModel from './Models/Task.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

let App = express();

const port = process.env.PORT || 3000;
// const mongoURI = process.env.MONGO_URL;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

App.use(cors());  
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
Aapp.use(express.static(path.join(__dirname, '../FrontEnd/dist')));



App.post("/addTask", async (req, res)=>{
    const addTask = req.body.inputValue//left question {}    
    console.log("i'm body",req.body.inputValue)
    console.log("i'm derived body",addTask)
    const addList = await taskModel.create(req.body.inputValue) 
    res.status(201).json(addList);
    console.log("i'm list",addList)
})

App.get("/getdata", async (req, res)=>{
    let gettask = await taskModel.find()
    res.json(gettask)
})

App.put("/tasks/:id", async (req, res) => {

  // let idUpdate = req.params.id
  // console.log(idUpdate) // ✅ from the URL
  try {
    const updated = await taskModel.findByIdAndUpdate(
      req.params.id,
     {Task: req.body.Task},      // ✅ updated data
      { new: true } 
     ) // return updated document
     res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

App.delete("/deletData", async (req, res)=>{
 const  Task  = req.body; 
//  console.log( { Task })
    let deletData = await taskModel.findOneAndDelete(Task)
    res.json(deletData)
    console.log(deletData)
})

App.get("/", (req, res)=>{
    res.send("hello")
})





App.listen(port, (req, res)=>{
  console.log(`🚀 Server running on http://localhost:${port}`);
})