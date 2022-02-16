import ToDoBox from './components/ToDoBox';
import { useSelector, useDispatch } from 'react-redux';
import NewBox from './components/newBox';

function App() {
  let categories = useSelector((state) => state.categories);
  let tasks = useSelector((state) => state.tasks)


  return (
    <div>
      <h1 className='text-4xl mt-5 ml-10'>To-Dos</h1>
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
