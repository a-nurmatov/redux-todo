import ToDoBox from './components/ToDoBox';
import { useSelector } from 'react-redux';
import NewBox from './components/newBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function App() {
  const [night, setNight] = useState(true);
  let categories = useSelector((state) => state.categories);
  let tasks = useSelector((state) => state.tasks)
  const toggleNight = () => {
    if (!night) document.getElementById('body').classList.add('dark');
    else document.getElementById('body').classList.remove('dark')
    setNight((state) => state ? false : true)
  }

  return (
    <div>
      <div className='mt-5 px-10 flex items-center justify-between'>
        <h1 className='text-4xl m-0'>To-Dos</h1>
        <button onClick={() => toggleNight()} className='night px-2 py-1 border-slate-500'><FontAwesomeIcon icon={night ? faSun : faMoon} /></button>
      </div>
      <div className="App flex items-start gap-4 px-10 pt-5">
        {
          categories.map((name, i) => {
            let allTasks = tasks[i];
            return (
              <ToDoBox key={name} name={name} tasksList={allTasks} idCat={i} />
            )
          })
        }
        <NewBox newCatId={categories.length} />
      </div>
    </div>
  );
}

export default App;
