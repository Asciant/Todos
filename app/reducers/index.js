import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import todoReducer from './todos';
import columnReducer from './columns';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    todos: todoReducer,
    columns: columnReducer
  });
}
