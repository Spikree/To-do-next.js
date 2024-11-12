import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
const Task = ({ taskTitle, task, date, status, setStatus }) => {
  return (
    <div className="max-w-80 border-accent border-2 p-4 rounded-md">
      <h1 className="text-2xl font-bold">{taskTitle}</h1>
      <p>
        {task}
      </p>
      <p>{date}</p>
      {status ? <CiCircleCheck /> : <RxCrossCircled />}
    </div>
  );
};

export default Task;
