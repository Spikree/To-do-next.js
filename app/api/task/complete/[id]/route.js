import Task from "@/models/task";
import { connectToDb } from "@/utils/database";

export const PATCH = async (request, {params}) => {
    const {id} = await params;

    try {
        await connectToDb()

        const task = await Task.findById(id)

        if(!task) {
            return new Response("No task found", {status:404})
        }

        task.complete = !task.complete;

        await task.save()
        return new Response(JSON.stringify(task),{status:200})
    } catch (error) {
        return new Response("Error updating completed status",{status:400})
    }
}