import * as Identicon from 'identicon.js';
import * as Md5 from 'md5.js';

function todoReducer(state = [], action) {
  const key = new Md5()
    .update(btoa(Math.random()).substring(0, 30))
    .digest('hex');
  const icon = new Identicon(btoa(Math.random()).substring(0, 30), {
    size: 64,
    format: 'svg'
  }).toString();

  switch (action.type) {
    case 'ADD_TODO': {
      // Add to the end of the previous state
      return [
        ...state,
        {
          task: action.task,
          date: Date.now(),
          icon,
          key
        }
      ];
    }
    case 'REMOVE_TODO': {
      console.log(action);
      // Return everything before and after, with the exception of the selection
      return [
        // State up until the todo's index
        ...state.slice(0, action.index),
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
