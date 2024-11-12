import { connectToDb } from "@/utils/database";
import Task from "@/models/task";
import { getSession } from "next-auth/react";

// GET ALL TASKS
export const GET = async (request, { params }) => {
//   const session = await getSession({ request });

//   if (!session) {
//     return new Response("You must be logged in to view tasks.", {
//       status: 401,
//     });
//   }

  try {
    await connectToDb();

    const { id } = params;

    const tasks = await Task.find({ user: id });

    if (!tasks) {
      return new Response("Tasks from this user not found");
    }

    return new Response(JSON.stringify(tasks), { status: 201 });
  } catch (error) {
    return new Response("Failed to fetch all tasks, internal server error", {
      status: 500,
    });
  }
};

// EDIT TASK

// DELETE TASK

// EDIT COMPLETE STATUS
