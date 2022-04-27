import React, { useState, useEffect } from 'react'
import { AiFillCaretDown } from "react-icons/ai";
import SubTask from './SubTask';

function Todo({ todos, handleStatus, addSubTask, handleSubtaskStatus }) {

    // This is used to show list of sub-tasks of a particular task
    const [showSubList, setShowSubList] = useState({
        show: false,
        id: null
    })


    // Method to handle click on drop down button on a task
    const handleSubList = (id) => {
        setShowSubList({
            show: !showSubList.show,
            id: id
        })
    }

    return todos.map((todo, index) => (
        <div>
            <div className='todo'
                key={index}
            >
                <div className='taskFirstDiv'>
                    <input type={'checkbox'}
                        value={todo.complete}
                        checked={todo.complete}
                        onChange={() => handleStatus(todo.id, index)}
                    />
                    <div>{todo.task} </div>
                </div>
                <div className='taskSecondDiv'>
                    <label>
                        {todo.subTasks.length ? `${todo.subTasksCompleted} out of ${todo.subTasks.length} completed` : ""}
                    </label>
                    <AiFillCaretDown onClick={() => handleSubList(todo.id)} />
                </div>
            </div>
            {
                showSubList.show && showSubList.id === todo.id ? (
                    <SubTask
                        onSubmit={addSubTask}
                        subTasks={todo.subTasks}
                        id={todo.id}
                        index={index}
                        handleSubtaskStatus={handleSubtaskStatus}
                    />
                ) : null
            }
        </div>

    ))
}

export default Todo