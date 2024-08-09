const initialState = [];

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TODOS':
      return action.payload;

    case 'ADD_TODO':
      return [...state, action.payload];

    case 'REMOVE_TODO':
      return state.filter(todo => todo._id !== action.payload);

    default:
      return state;
  }
}
