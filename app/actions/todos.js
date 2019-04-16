import {
  ADD_TODO,
  EDIT_TODO,
  REMOVE_TODO,
  TOGGLE_TODO,
  REORDER_TODO,
  UPDATE_TODO_COLUMN
} from '../constants/actions';

export function addTodo(task, column) {
  return {
    type: ADD_TODO,
    task,
    column
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

export function updateTodoColumn(todo, index, newColumnKey) {
  return {
    type: UPDATE_TODO_COLUMN,
    todo,
    index,
    newColumnKey
  };
}
