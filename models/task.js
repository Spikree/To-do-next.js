import {Schema, model, models} from "mongoose";

const taskSchema = new Schema({
    title: {type: String, required: true},
    taskcontent: {type:String, required: true},
    complete: {type: Boolean, default: false, required: true},
    date: {type:Date, default: Date.now, required: true},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

const Task = models.Task || model("Task",taskSchema)

export default Task;