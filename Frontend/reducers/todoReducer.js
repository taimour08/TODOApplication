import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from '../actions/todoActions';

const initialState = [];

// taking the initial states & actions -> returning the new state

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { ...action.payload, completed: false }]; // if action recvd is ADD_TODO, then add.  
    case REMOVE_TODO:
      return state.filter((_, index) => index !== action.payload);
    case TOGGLE_TODO:
      return state.map((todo, index) =>
        index === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return state;
  }
};

export default todoReducer;
