import { connectToDb } from "@/utils/database";
import Task from "@/models/task"

export const GET = async(request, {params}) => {
    
    try {
        await connectToDb()
        const {id} = await params;
        const task = await Task.findById(id)
        return new Response(JSON.stringify(task),{status:200})
    } catch (error) {
        return new Response("error fetching task",{status:500})
    }
}