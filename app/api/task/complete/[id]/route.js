import Task from "@/models/task";
import { connectToDb } from "@/utils/database";
import { getSession } from "next-auth/react";

export const PATCH = async (request, {params}) => {
    const taskId = params.id;

    const session = await getSession({ request });

    if (!session) {
      return new Response("You must be logged in to view tasks.", {
        status: 401,
      });
    }

    try {
        await connectToDb()

        const task = await Task.findById(taskId)

        if(!task) {
            return new Response("No task found", {status:404})
        }

        task.complete = true;

        await task.save()
        return new Response(JSON.stringify(task),{status:200})
    } catch (error) {
        return new Response("Error updating completed status",{status:400})
    }
}