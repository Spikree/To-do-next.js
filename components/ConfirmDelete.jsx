const ConfirmDelete = ({ deleteTaskId, deleteTask, setShowConfirmDeleteModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg text-white w-full max-w-sm mx-4 sm:max-w-md">
        <div className="text-lg font-semibold mb-4 text-center">
          Are you sure you want to delete this task?
        </div>
        <div className="flex gap-10">
          <button
            onClick={() => {
              deleteTask(deleteTaskId);
            }}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 sm:w-auto"
          >
            Delete
          </button>
          <button
            onClick={() => {
              setShowConfirmDeleteModal(false);
            }}
            className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
