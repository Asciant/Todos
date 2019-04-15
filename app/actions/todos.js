import {
  ADD_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  REORDER_TODO
} from '../constants/actions';

export function addTodo(task) {
  return {
    type: ADD_TODO,
    task
  };
}

export function removeTodo(todo, index) {
  return {
    type: REMOVE_TODO,
    todo,
    index
  };
}

export function editTodo(todo, index) {
  return {
    type: EDIT_TODO,
    todo,
    index
  };
}

export function toggleTodo(todo, index) {
  return {
    type: TOGGLE_TODO,
    todo,
    index
  };
}

export function reorderTodos(orderedTodos) {
  return {
    type: REORDER_TODO,
    orderedTodos
  };
}
