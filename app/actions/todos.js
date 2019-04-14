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

export function toggleTodo(todo) {
  return {
    type: 'TOGGLE_TODO',
    todo
  };
}
