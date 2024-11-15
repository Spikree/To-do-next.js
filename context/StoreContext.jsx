"use client"

import { createContext, useState, useContext } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [incompleteTasks, setIncompleteTasks] = useState([]);
  const [completeTasks, setCompleteTasks] = useState([]);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  
  return (
    <MyContext.Provider value={{ incompleteTasks, setIncompleteTasks,completeTasks,setCompleteTasks,showCompletedTasks,setShowCompletedTasks }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
