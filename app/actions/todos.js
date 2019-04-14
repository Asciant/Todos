export function addTodo(task) {
  return {
    type: 'ADD_TODO',
    task
  };
}

export function removeTodo(todo, index) {
  return {
    type: 'REMOVE_TODO',
    todo,
    index
  };
}

export function editTodo(todo, index) {
  return {
    type: 'EDIT_TODO',
    todo,
    index
  };
}

export function toggleTodo(todo, index) {
  return {
    type: 'TOGGLE_TODO',
    todo,
    index
  };
}
