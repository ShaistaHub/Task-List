import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  Task: { type: String, required: true },
})

const taskModel =  mongoose.model("taskModel", TaskSchema)

export default taskModel
