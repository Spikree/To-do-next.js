const Task = ({ taskTitle, task, date, status, setStatus }) => {
  return (
    <div className="max-w-80 border-accent border-2 p-4 rounded-md">
      <h1 className="text-2xl font-bold">{taskTitle}Task</h1>
      <p>
        {task} Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Accusamus culpa totam, veniam, eius maiores aliquid, iure ea delectus
        atque ab fugit quos deserunt excepturi tenetur quasi animi quia adipisci
        labore?
      </p>
      <p>{date}2/22/23</p>
      
    </div>
  );
};

export default Task;
