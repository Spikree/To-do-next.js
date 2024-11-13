const ConfirmDelete = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg text-white max-w-md mx-auto">
      <div className="text-lg font-semibold mb-4">
        Are you sure you want to delete this task?
      </div>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300">
          Delete
        </button>
        <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
