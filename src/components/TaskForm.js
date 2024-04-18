import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../redux/actions';

const TaskForm = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleTaskSubmit = (event) => {
    event.preventDefault();
    if (taskTitle.trim() !== '') {
      const newTask = {
        id: new Date().getTime().toString(),
        title: taskTitle,
        completed: false,
      };
      addTask(newTask);
      setTaskTitle('');
    }
  };

  return (
    <form onSubmit={handleTaskSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={handleTaskTitleChange}
        placeholder="Enter task title"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default connect(null, { addTask })(TaskForm);