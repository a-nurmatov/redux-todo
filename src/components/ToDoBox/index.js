import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

function TaskItem({ task, taskId, ...props }) {
  let elementRef = useRef();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [newTask, setNewTask] = useState(task.title);

  const deleteTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: { taskId: id, catId: props.idCat } })
  }
  const editTask = (id) => {
    let input = elementRef.current;
    !isEdit && input.focus();
    if (isEdit) dispatch({ type: 'EDIT_TASK', payload: { taskId: id, catId: props.idCat, task: { title: input.value, completed: false, deadline: new Date() } } })
    setIsEdit((state) => state ? false : true)
  }
  return (
    <li draggable={true} key={taskId} title={task.deadline.toString()} className='task-item w-full flex items-start bg-lime-50 p-3 mb-2 rounded-lg'>
      <input value={newTask} onChange={(e) => setNewTask(e.target.value)} ref={elementRef} readOnly={isEdit ? false : true} type="text" className='w-full bg-transparent outline-none' />
      {isEdit ? <button onClick={() => editTask(taskId)} className='rounded-lg hover:bg-green-600 bg-green-500 text-white px-1.5 pt-1 pb-1 text-xs ml-1'><FontAwesomeIcon icon={faCheck} /></button> :
        <button onClick={() => editTask(taskId)} className='rounded-lg hover:bg-yellow-600 bg-yellow-500 text-white px-1.5 pt-1 pb-1 text-xs ml-1'><FontAwesomeIcon icon={faPen} /></button>}
      <button onClick={() => deleteTask(taskId)} className='rounded-lg hover:bg-red-600 bg-red-500 text-white px-1.5 pt-1 pb-1 text-xs ml-1'><FontAwesomeIcon icon={faTrash} /></button>
    </li>
  )
}

export default function ToDoBox({ tasksList, name, ...props }) {
  let elementRef = useRef();
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const addTask = (e) => {
    let curInputValue = elementRef.current.value;
    if (curInputValue) {
      dispatch({ type: 'ADD_TASK', payload: { id: props.idCat, task: { title: curInputValue, completed: false, deadline: new Date() } } })
      elementRef.current.value = '';
    }
  }
  return (
    <div className='toDoBox p-5'>
      <h1 className='mb-2 pl-0.5'>{name}</h1>
      <div className='flex items-center'>
        <input type="text" ref={elementRef} placeholder='Enter task here' onChange={(e) => setNewTask(e.target.value)} className='add-input w-full px-2.5 py-2 rounded-lg outline-none' />
        <button onClick={(e) => addTask(e)} className='rounded-lg hover:bg-green-600 bg-green-500 text-white px-2.5 py-2.5 text-sm ml-2'>Add</button>
      </div>
      <ul className='mt-3'>
        {
          tasksList && tasksList.map((task, i) => {
            return (
              <TaskItem task={task} taskId={i} {...props} />
            )
          })
        }
      </ul>
    </div>
  )
}
