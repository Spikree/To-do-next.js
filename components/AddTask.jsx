import { useState } from "react";

const AddTask = ({
  newTaskTitle,
  newTaskContent,
  setNewTaskTitle,
  setNewTaskContent,
  setShowAddTask,
  addTask,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-black rounded-lg shadow-lg p-6 w-80 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Add New Task</h2>
        <form onSubmit={(e) => addTask(e)}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-500">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-700 bg-gray-900 text-white rounded"
              placeholder="Task Title"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="taskContent" className="block text-gray-500">
              Task Content
            </label>
            <textarea
              rows={5}
              cols={40}
              id="taskContent"
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-700 bg-gray-900 text-white rounded resize-none"
              placeholder="Task Content"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setShowAddTask((prev) => !prev);
              }}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
