import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function NewBox(props) {
  let elementRef = useRef();
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const addTask = (e) => {
    let curInputValue = elementRef.current.value;
    if (curInputValue) {
      dispatch({ type: 'ADD_CAT', payload: { catName: curInputValue, newCatId: props.newCatId } })
      elementRef.current.value = '';
    }
  }
  return (
    <div className='toDoBox p-5'>
      <div className='flex items-center'>
        <input type="text" ref={elementRef} placeholder='Add new list' onChange={(e) => setNewTask(e.target.value)} className='add-input w-full px-2.5 py-2 rounded-lg outline-none' />
        <button onClick={(e) => addTask(e)} className='rounded-lg hover:bg-green-600 bg-green-500 text-white px-3 py-2.5 text-sm ml-2'><FontAwesomeIcon icon={faPlus} /></button>
      </div>
    </div>
  )
}
