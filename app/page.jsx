"use client"

import Task from "@/components/Task"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import axios from "axios"

const Home = () => {
  const {data: session } = useSession();
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if(!session) {
      return
    }
    try {
      const fetchTasks = async () => {
        try {
          const res = await axios.get(`/api/task/${session?.user.id}`)
          setTasks(res.data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchTasks()
    } catch (error) {
      console.log(error)
    }
  },[session])

  return (
    <div className="w-full px-10 min-h-max">
      {
        tasks?.map((task,idx) => {
          return <Task key={idx} task={task.taskcontent} taskTitle={task.title} status={task.complete} date={task.date} />
        })
      }
      
    </div>
  )
}

export default Home