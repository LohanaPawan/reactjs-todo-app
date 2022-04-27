import React, { useState, useEffect, useRef } from 'react'

function SubTask({ subTasks, onSubmit, id, index, handleSubtaskStatus }) {

    const [input, setInput] = useState('')

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })


    const handleInput = e => {
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log("2")
        onSubmit({
            id: id,
            index: index,
            data: {
                id: Math.floor(Math.random() * 10000),
                subTask: input,
                complete: false
            }
        })

        setInput("")
    }


    return (
        <div>
            {subTasks.map((item, subItemIndex) => {
                return (
                    <div className='sub-todo'
                        key={subItemIndex}
                    >
                        <div className='taskFirstDiv'>
                            <input type={'checkbox'}
                                value={item.complete}
                                checked={item.complete}
                                onChange={() => handleSubtaskStatus({ itemIndex: index, subItemIndex: subItemIndex })}
                            />
                            <div>{item.subTask} </div>
                        </div>
                    </div>
                )
            })}
            <div>
                <form className='subTask-form' onSubmit={handleSubmit}>
                    <input
                        className='subTask-input'
                        placeholder='What are the steps'
                        value={input}
                        type='text'
                        autoFocus={true}
                        onChange={handleInput}
                        ref={inputRef}
                    />

                    <button className='subTask-button'>
                        Add
                    </button>
                </form>
            </div>
        </div>
    )


}

export default SubTask