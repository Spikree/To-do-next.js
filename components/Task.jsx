import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const Task = ({
  taskTitle,
  task,
  date,
  status,
  taskId,
  markChecked,
  deleteTask,
  showEditOption,
  fetchTask,
  setShowConfirmDeleteModal,
  setDeleteTaskId
}) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString()}, ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="max-w-80 w-full border-accent border-2 p-6 rounded-md">
      <h1 className={status ? "text-2xl font-bold line-through" : "text-2xl font-bold "}>{taskTitle}</h1>
      <p>{task}</p>
      <p>{formatDate(date)}</p>
      <div className="flex justify-between pt-5">
        <div>
          <button>
            <MdDelete
              onClick={() => {
                setShowConfirmDeleteModal(prev => !prev);
                setDeleteTaskId(taskId)
              }}
              className="text-4xl"
            />
          </button>
          <button>
            <MdModeEdit
              onClick={() => {
                showEditOption(taskId);
                fetchTask(taskId);
              }}
              className="text-4xl"
            />
          </button>
        </div>
        {status ? (
          <RxCrossCircled
            onClick={() => {
              markChecked(taskId);
            }}
            className="text-4xl cursor-pointer"
          />
        ) : (
          <CiCircleCheck
            onClick={() => {
              markChecked(taskId);
            }}
            className="text-4xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Task;
