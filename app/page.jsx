"use client";

import Task from "@/components/Task";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import EditTask from "@/components/EditTask";

const Home = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState([]);
  const [stateUpdater,setStateUpdater] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId,setEditTaskId] = useState(null)
  const [taskTitle, setTaskTitle] = useState("")
  const [taskContent, setTaskContent] = useState("")
 
  useEffect(() => {
    if (!session) {
      return;
    }
    try {
      const fetchTasks = async () => {
        try {
          const res = await axios.get(`/api/task/${session?.user.id}`);
          setTasks(res.data || []);
          // console.log(tasks)
        } catch (error) {
          console.log(error);
        }
      };
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }, [session, stateUpdater]);

  const markChecked = async (taskId) => {
    try {
      const response = await axios.patch(`/api/task/complete/${taskId}`);
      // console.log(response);
      setStateUpdater((prev) => !prev)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`/api/task/${taskId}`)
      setStateUpdater(prev => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  const showEditOption = (taskId) => {
    setEditTaskId(taskId)
    setShowEditModal(prev => !prev);
    console.log(taskId)
  }

  const fetchTask = async (editTaskId) => {
    try {
      const response = await axios.get(`/api/task/fetch/${editTaskId}`)
      setTaskTitle(response.data.title)
      setTaskContent(response.data.taskcontent)
    } catch (error) {
      console.log(error)
    }
   
  }

  const cancleEdit = () => {
    setShowEditModal(prev => !prev);
  }

  const editTask = async (editTaskId) => {
    try {
      const response = await axios.patch(`/api/task/${editTaskId}`,{
        title: taskTitle,
        taskcontent: taskContent,
      })
      console.log(response)
      setShowEditModal(prev => !prev)
      setStateUpdater(prev => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full px-10 min-h-max">
      {Array.isArray(tasks) &&
        tasks.length > 0 ? 
        tasks?.map((task, idx) => {
          return (
            <Task
              key={idx}
              markChecked={markChecked}
              deleteTask={deleteTask}
              taskId={task._id}
              task={task.taskcontent}
              taskTitle={task.title}
              status={task.complete}
              date={task.date}
              showEditOption={showEditOption}
              setEditTaskId={setEditTaskId}
              fetchTask={fetchTask}
            />
          );
        })
        :

        <p>No tasks available</p>
      }{
        showEditModal ? <EditTask setTaskContent={setTaskContent} setTaskTitle={setTaskTitle} taskTitle={taskTitle} taskContent={taskContent} editTaskId={editTaskId} editTask={editTask} cancleEdit={cancleEdit}/> : ""
      }
    </div>
  );
};

export default Home;
