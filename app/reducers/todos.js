import * as Md5 from 'md5.js';

import {
  ADD_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  REORDER_TODO,
  UPDATE_TODO_COLUMN_AND_REORDER
} from '../constants/actions';

function todoReducer(state = [], action) {
  const key = new Md5()
    .update(btoa(Math.random()).substring(0, 30))
    .digest('hex');

  switch (action.type) {
    case ADD_TODO: {
      // Add to the end of the previous state
      return [
        ...state,
        {
          task: action.task,
          date: Date.now(),
          complete: false,
          key,
          column: action.column
        }
      ];
    }
    case REMOVE_TODO: {
      // Return everything before and after, with the exception of the selection
      return [
        // State up until the todo's index
        ...state.slice(0, action.index),
        // after the deleted one, until the end
        ...state.slice(action.index + 1)
        // essentially the todo is being omitted from the new array
      ];
    }
    case EDIT_TODO: {
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
    case TOGGLE_TODO: {
      const toggledTodo = action.todo;
      toggledTodo.complete = !toggledTodo.complete;
      if (toggledTodo.complete === true) {
        // Its complete, so to the bottom
        return [
          // State up until the todo's index
          ...state.slice(0, action.index),
          // after the current one, until the end
          ...state.slice(action.index + 1),
          // Add our updated todo in place
          toggledTodo
        ];
      }
      // Its not complete, so back to the top
      return [
        // Add our updated todo in place
        toggledTodo,
        // State up until the todo's index
        ...state.slice(0, action.index),
        // after the current one, until the end
        ...state.slice(action.index + 1)
      ];
    }
    case REORDER_TODO: {
      // Find all the todos that match that column key
      // Reorder them to match the order being supplied in reorderedTodos

      const allOtherTodos = state.filter(t => t.column !== action.column);
      return [...allOtherTodos, ...action.orderedTodos];
    }
    case UPDATE_TODO_COLUMN_AND_REORDER: {
      // ? Update the todo so todo.colum = new column's key
      const updatedTodo = Object.assign({}, action.todo, {
        column: action.newColumnKey
      });

      // ? Put the updated todo into the new State (updatedTodos)
      const updatedTodos = [
        ...state.slice(0, action.index),
        updatedTodo,
        ...state.slice(action.index + 1)
      ];

      // ? The re-order component, get the todo into the right order in its column
      const finishTaskIds = state.filter(t => t.column === action.newColumnKey);

      finishTaskIds.splice(action.destinationIndex, 0, updatedTodo);

      // ? We have to provide all the other todos so we don't trim the array
      const allOtherTodos = updatedTodos.filter(
        t => t.column !== action.newColumnKey
      );

      return [...allOtherTodos, ...finishTaskIds];

      // const finishTaskIds = state.filter(t => t.column === action.newColumnKey);
      // finishTaskIds.splice(destination.index, 0, todos[draggedTodoId]);
    }
    default:
      return state;
  }
}

export default todoReducer;
