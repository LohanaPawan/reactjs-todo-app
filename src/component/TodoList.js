import React, { useState } from 'react'
import AddTodo from './AddTodo'
import Todo from './Todo'

function TodoList() {
    const [todoList, setTodoList] = useState([])



    // Method to update status of the task
    const handleStatus = (id, index) => {
        let newArray = [...todoList]
        let task = newArray[index]
        let taskComplete = task.complete
        let subTasks = task.subTasks
        if (subTasks && !taskComplete) {
            subTasks.forEach((subtask, index) => {
                subtask.complete = true
            })
        }
        setTodoList((items) => {
            return items.map(item => item.id === id ? { ...item, complete: !item.complete, subTasks: subTasks } : item)
        })
    }



    // Method to update status of the sub-task
    const handleSubtaskStatus = ({ itemIndex, subItemIndex }) => {

        let newArray = [...todoList]

        let item = newArray[itemIndex]
        let subTaskList = item.subTasks
        let sub = subTaskList[subItemIndex]
        sub.complete = !sub.complete
        subTaskList[subItemIndex] = sub
        item.subTasks = subTaskList

        let signal = true
        let counter = 0
        subTaskList.forEach(i => {
            if (!i.complete) {
                signal = false
            } else {
                counter++
            }
        })

        item.subTasksCompleted = counter

        if (signal) {
            item.complete = true
        } else {
            item.complete = false
        }
        newArray[itemIndex] = item
        setTodoList(newArray)
    }


    // Method to add a new sub-task
    const addSubTask = ({ id, data, index }) => {

        const newArray = [...todoList]
        const item = newArray[index]
        const subTaskList = item.subTasks
        subTaskList.push(data)

        setTodoList((tasks) => {
            return tasks.map(task => task.id === id ? { ...task, subTasks: subTaskList } : task)
        })
    }



    // Method to add a new task
    const addTodo = item => {
        if (!item.task) {
            return
        }
        const newList = [...todoList, item]
        setTodoList(newList)
    }


    return (
        <div>
            <AddTodo onSubmit={addTodo} />
            {
                todoList.length && <Todo
                    todos={todoList}
                    handleStatus={handleStatus}
                    addSubTask={addSubTask}
                    handleSubtaskStatus={handleSubtaskStatus}
                />
            }
        </div>
    )
}

export default TodoList