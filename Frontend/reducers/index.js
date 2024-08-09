import { combineReducers } from 'redux';
import todoReducer from './todoReducer';

//You might have multiple reducers, so you'll use combineReducers to combine them (even if you only have one reducer now).

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;
