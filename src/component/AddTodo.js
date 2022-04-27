import React, { useState, useRef, useEffect } from 'react'

function AddTodo(props) {
  const [input, setInput] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  })


  const handleInput = e => {
    setInput(e.target.value)
  }

  // Method to handle click on add button
  const handleSubmit = e => {
    e.preventDefault()

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      task: input,
      complete: false,
      subTasksCompleted: 0,
      subTasks: []
    })

    // To make input box empty
    setInput("")
  }


  return (
    <form className='todo-form' onSubmit={handleSubmit}>
      <input
        className='input'
        placeholder='Add a todo'
        value={input}
        type='text'
        autoFocus={true}
        onChange={handleInput}
        ref={inputRef}
      />

      <button className='todo-button'>
        Add
      </button>
    </form>
  )
}

export default AddTodo