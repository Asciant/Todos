import * as Md5 from 'md5.js';

function todoReducer(state = [], action) {
  const key = new Md5()
    .update(btoa(Math.random()).substring(0, 30))
    .digest('hex');

  switch (action.type) {
    case 'ADD_TODO': {
      // Add to the end of the previous state
      return [
        ...state,
        {
          task: action.task,
          date: Date.now(),
          complete: false,
          key
        }
      ];
    }
    case 'REMOVE_TODO': {
      // Return everything before and after, with the exception of the selection
      return [
        // State up until the todo's index
        ...state.slice(0, action.index),
        // after the deleted one, until the end
        ...state.slice(action.index + 1)
        // essentially the todo is being omitted from the new array
      ];
    }
    case 'EDIT_TODO': {
      // Use the remove todo functionality to remove the existing todo and replace it with a new todo object

      // ! This functionality is not currently used
      // ! Refer handleUpdate in Todos component

      return [
        // State up until the todo's index
        ...state.slice(0, action.index),
        // Add our updated todo in place
        action.todo,
        // after the deleted one, until the end
        ...state.slice(action.index + 1)
        // essentially the todo is being omitted from the new array
      ];
    }
    default:
      return state;
  }
}

export default todoReducer;
