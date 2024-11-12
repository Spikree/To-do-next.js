import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

const Task = ({ taskTitle, task, date, status, taskId, markChecked,deleteTask }) => {
  return (
    <div className="max-w-80 border-accent border-2 p-4 rounded-md">
      <h1 className="text-2xl font-bold">{taskTitle}</h1>
      <p>{task}</p>
      <p>{date}</p>
      {status ? (
        <RxCrossCircled
          onClick={() => {
            markChecked(taskId);
          }}
          className="text-4xl"
        />
      ) : (
        <CiCircleCheck
          onClick={() => {
            markChecked(taskId);
          }}
          className="text-4xl"
        />
      )}

      <button><MdDelete onClick={() => {deleteTask(taskId)}} className="text-4xl" /></button>
      <button><MdModeEdit className="text-4xl" /></button>
    </div>
  );
};

export default Task;
