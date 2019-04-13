export function addTodo(task) {
  return {
    type: 'ADD_TODO',
    task
  };
}

export function removeTodo(todo) {
  return {
    type: 'REMOVE_TODO',
    todo
  };
}

export function toggleTodo(todo) {
  return {
    type: 'ADD_TODO',
    todo
  };
}
