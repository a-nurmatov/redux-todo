import { createStore } from 'redux';

const initialState = {
  tasks: {},
  categories: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: { ...state.tasks, [`${action.payload.id}`]: [...state.tasks[`${action.payload.id}`], action.payload.task] }
      };
    case 'ADD_CAT':
      return {
        ...state,
        tasks: {
          ...state.tasks, [`${action.payload.newCatId}`]: []
        },
        categories: [...state.categories, action.payload.catName]
      };
    case 'REMOVE_TASK':
      let newTasks = state['tasks'];
      newTasks[action.payload.catId].splice(action.payload.taskId, 1);
      return {
        ...state,
        tasks: {
          ...newTasks
        }
      }
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;