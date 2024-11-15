"use client";

import Task from "@/components/Task";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import EditTask from "@/components/EditTask";
import AddTask from "@/components/AddTask";
import ConfirmDelete from "@/components/ConfirmDelete";
import { useMyContext } from "@/context/StoreContext";

const Home = () => {
  const { data: session } = useSession();
  // const [tasks, setTasks] = useState([]);
  const [stateUpdater, setStateUpdater] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskContent, setNewTaskContent] = useState("");
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const {
    incompleteTasks,
    setIncompleteTasks,
    completeTasks,
    setCompleteTasks,
    showCompletedTasks,
  } = useMyContext();

  useEffect(() => {
    if (!session) {
      return;
    }
    try {
      const fetchTasks = async () => {
        try {
          const res = await axios.get(`/api/task/${session?.user.id}`);
          const fetchedTasks = Array.isArray(res.data) ? res.data : [];

          // setTasks(fetchedTasks);

          const completed = fetchedTasks?.filter((task) => task.complete);
          const incomplete = fetchedTasks?.filter((task) => !task.complete);

          setCompleteTasks(() => completed);
          setIncompleteTasks(() => incomplete);

          // console.log("incomplete tasks", incompleteTasks);
          // console.log("complete tasks", completeTasks);
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
      setStateUpdater((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`/api/task/${taskId}`);
      setStateUpdater((prev) => !prev);
      setShowConfirmDeleteModal((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const showEditOption = (taskId) => {
    setEditTaskId(taskId);
    setShowEditModal((prev) => !prev);
    // console.log(taskId);
  };

  const fetchTask = async (editTaskId) => {
    try {
      const response = await axios.get(`/api/task/fetch/${editTaskId}`);
      setTaskTitle(response.data.title);
      setTaskContent(response.data.taskcontent);
    } catch (error) {
      console.log(error);
    }
  };

  const cancleEdit = () => {
    setShowEditModal((prev) => !prev);
  };

  const editTask = async (editTaskId) => {
    try {
      const response = await axios.patch(`/api/task/${editTaskId}`, {
        title: taskTitle,
        taskcontent: taskContent,
      });
      // console.log(response);
      setShowEditModal((prev) => !prev);
      setStateUpdater((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/task/new`, {
        userId: session?.user.id,
        title: newTaskTitle,
        taskcontent: newTaskContent,
      });
      setShowAddTask((prev) => !prev);
      setStateUpdater((prev) => !prev);
      setNewTaskTitle("");
      setNewTaskContent("");
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-10 min-h-max">
      {showCompletedTasks ? (
        <div>
          {" "}
          {session ? (
            <div className="flex gap-8 py-4 flex-wrap justify-center">
              {Array.isArray(completeTasks) && completeTasks.length > 0 ? (
                completeTasks?.map((task, idx) => {
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
                      setShowConfirmDeleteModal={setShowConfirmDeleteModal}
                      setDeleteTaskId={setDeleteTaskId}
                    />
                  );
                })
              ) : (
                <p className="text-lg text-center">No tasks available</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col align-middle justify-center items-center min-h-80 px-10">
              <h1 className="text-4xl sm:text-6xl bold p-8">
                lOGIN TO START USING TODONEXT.JS
              </h1>
            </div>
          )}{" "}
        </div>
      ) : (
        <div>
          {" "}
          {session ? (
            <div className="flex gap-8 py-4 flex-wrap justify-center">
              {Array.isArray(incompleteTasks) && incompleteTasks.length > 0 ? (
                incompleteTasks?.map((task, idx) => {
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
                      setShowConfirmDeleteModal={setShowConfirmDeleteModal}
                      setDeleteTaskId={setDeleteTaskId}
                    />
                  );
                })
              ) : (
                <p className="text-lg text-center">No tasks available</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col align-middle justify-center items-center min-h-80 px-10">
              <h1 className="text-4xl sm:text-6xl bold p-8">
                lOGIN TO START USING TODONEXT.JS
              </h1>
            </div>
          )}{" "}
        </div>
      )}

      {showEditModal ? (
        <EditTask
          setTaskContent={setTaskContent}
          setTaskTitle={setTaskTitle}
          taskTitle={taskTitle}
          taskContent={taskContent}
          editTaskId={editTaskId}
          editTask={editTask}
          cancleEdit={cancleEdit}
        />
      ) : (
        ""
      )}

      {showAddTask ? (
        <AddTask
          addTask={addTask}
          setShowAddTask={setShowAddTask}
          newTaskTitle={newTaskTitle}
          newTaskContent={newTaskContent}
          setNewTaskTitle={setNewTaskTitle}
          setNewTaskContent={setNewTaskContent}
        />
      ) : (
        ""
      )}

      {session ? (
        <button
          onClick={() => {
            setShowAddTask((prev) => !prev);
          }}
          className="fixed bottom-10 right-10 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition"
        >
          Add Task
        </button>
      ) : (
        ""
      )}

      {showConfirmDeleteModal && (
        <ConfirmDelete
          setShowConfirmDeleteModal={setShowConfirmDeleteModal}
          deleteTaskId={deleteTaskId}
          deleteTask={deleteTask}
        />
      )}
    </div>
  );
};

export default Home;
