import { connectToDb } from "@/utils/database";
import Task from "@/models/task";

export const POST = async (req) => {
  const { userId, title, taskcontent } = await req.json();

  try {
    await connectToDb()
    const newTask = new Task({user: userId,title: title,taskcontent: taskcontent})

    await newTask.save()

    return new Response(JSON.stringify(newTask), {status:201})
  } catch (error) {
    console.log(error)
    return new Response("failed to create a new task", {status: 500})
  }
}
