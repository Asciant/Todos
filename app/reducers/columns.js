import * as Md5 from 'md5.js';

import {
  ADD_COLUMN,
  EDIT_COLUMN,
  REMOVE_COLUMN,
  REORDER_COLUMN
} from '../constants/actions';

function columnReducer(state = [], action) {
  const key = new Md5()
    .update(btoa(Math.random()).substring(0, 30))
    .digest('hex');

  switch (action.type) {
    case ADD_COLUMN: {
      // Add to the end of the previous state
      return [
        ...state,
        {
          name:
            action.name ||
            new Md5()
              .update(btoa(Math.random()).substring(0, 30))
              .digest('hex'),
          date: Date.now(),
          key
        }
      ];
    }
    case REMOVE_COLUMN: {
      // Return everything before and after, with the exception of the selection
      return [
        // State up until the todo's index
        ...state.slice(0, action.index),
        // after the deleted one, until the end
        ...state.slice(action.index + 1)
        // essentially the todo is being omitted from the new array
      ];
    }
    case EDIT_COLUMN: {
      // Use the remove todo functionality to remove the existing todo and replace it with a new todo object

      // ! This functionality is not currently used
      // ! Refer handleUpdate in Todos component

      return [
        // State up until the todo's index
        ...state.slice(0, action.index),
        // Add our updated todo in place
        action.column,
        // after the deleted one, until the end
        ...state.slice(action.index + 1)
        // essentially the todo is being omitted from the new array
      ];
    }
    case REORDER_COLUMN: {
      return action.orderedColumns;
    }
    default:
      return state;
  }
}

export default columnReducer;
