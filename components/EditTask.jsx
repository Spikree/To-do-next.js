import { useState } from "react";

const EditTask = ({cancleEdit ,editTask,editTaskId,taskTitle,taskContent,setTaskContent,setTaskTitle}) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-black rounded-lg shadow-lg p-6 w-80 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Edit Task</h2>
        <label className="block mb-2">
          <span className="text-gray-500">Title</span>
          <input
            type="text"
            onChange={(e) => {setTaskTitle(e.target.value)}}
            value={taskTitle}
            className="mt-1 p-2 w-full border border-gray-700 bg-gray-900 text-white rounded"
            placeholder="Task Title"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-500">Task Content</span>
          <textarea
            className="mt-1 p-2 w-full border border-gray-700 bg-gray-900 text-white rounded resize-none"
            onChange={(e) => {setTaskContent(e.target.value)}}
            value={taskContent}
            placeholder="Task Content"
            rows={4}
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button
          onClick={() => {cancleEdit()}}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              editTask(editTaskId);
            }}
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
