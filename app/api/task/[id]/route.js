import { connectToDb } from "@/utils/database";
import Task from "@/models/task";

// GET ALL TASKS
export const GET = async (request, { params }) => {

  try {
    await connectToDb();

    const {id} = await params;
    
    const tasks = await Task.find({ user: id });

    if (tasks.length === 0) {
      return new Response("Tasks from this user not found");
    }

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all tasks, internal server error", {
      status: 500,
    });
  }
};

// EDIT TASK
export const PATCH = async (request, {params}) => {
    const {title, taskcontent } = await request.json();

    const taskId = params.id

    try {
        await connectToDb()
        const task = await Task.findById(taskId)

        if(!task) {
            return new Response("No task found", {status:400})
        }
    
        task.title = title;
        task.taskcontent = taskcontent;
    
        await task.save()
        return new Response(JSON.stringify(task),{status: 200})
    
    } catch (error) {
        return new Response("Failed to update the task", {status: 500})
    }

}

// DELETE TASK
export const DELETE = async (request, {params}) => {

    try {
        await connectToDb();
        const taskId = params.id;

        await Task.findByIdAndDelete(taskId)

        return new Response("Task Deleted Sucessfully", {status: 200})
    } catch (error) {
        return new Response("Error deleting the task", {status: 400})
    }
}
