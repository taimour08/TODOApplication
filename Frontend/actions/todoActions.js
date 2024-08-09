export const setTodos = (todos) => ({
  type: 'SET_TODOS',
  payload: todos,
});

export const addTodo = (name, description) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: name, description }),
    });

    const newTodo = await response.json();
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  } catch (error) {
    console.error('Failed to add todo:', error);
  }
};

export const removeTodo = (id) => ({
  type: 'REMOVE_TODO',
  payload: id,
});
