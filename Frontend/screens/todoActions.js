export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

export const addTodo = (name, description) => ({
  type: ADD_TODO,
  payload: { name, description }
});

export const removeTodo = (index) => ({
  type: REMOVE_TODO,
  payload: index
});

export const toggleTodo = (index) => ({
  type: TOGGLE_TODO,
  payload: index
});
