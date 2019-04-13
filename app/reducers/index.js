// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import todoReducer from './todos';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    todos: todoReducer
  });
}
