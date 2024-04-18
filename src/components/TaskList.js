import React from 'react';
import { connect } from 'react-redux';
import { updateTask, removeTask, setFilter } from '../redux/actions';


const TaskList = ({ tasks, updateTask, removeTask, setFilter }) => {
    //This just toggles between completed and incomplete when clicked
    const handleTaskStatusChange = (taskId) => {
        const updatedTask = tasks.find((task) => task.id === taskId);
        updatedTask.completed = !updatedTask.completed;
        updateTask(updatedTask);
    };

    //calls the removeTask function to delete task with given taskId
    const handleTaskDeletion = (taskId) => {
        removeTask(taskId);
    };

    //setsFilter to all, complete or incomplete
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>

            {/* if event changes it triggers the handlefilter change function */}
            <select onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
            </select>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span
                            style={{
                                textDecoration: task.completed ? 'line-through' : 'none', //if task is complete, it strikes through the task.
                            }}
                        >
                            {task.title}
                        </span>
                        {/* renders the buttons for changing task status and delete */}
                        <button onClick={() => handleTaskStatusChange(task.id)} class={`task-status ${task.completed ? 'completed' : 'incomplete'}`}>
                            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>
                        <button onClick={() => handleTaskDeletion(task.id)} style={{ background: '#d32f2f' }}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

//Performs filtering by extractig relevant data from Redux store's state

const mapStateToProps = (state) => {
    const { tasks, filter } = state;

    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === 'incomplete') {
        filteredTasks = tasks.filter((task) => !task.completed);
    }

    return {
        tasks: filteredTasks,
    };
};

export default connect(mapStateToProps, { updateTask, removeTask, setFilter })(TaskList);