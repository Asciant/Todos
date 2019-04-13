import * as Identicon from 'identicon.js';
import * as Md5 from 'md5.js';

function todoReducer(state = [], action) {
  const key = new Md5()
    .update(btoa(Math.random()).substring(0, 30))
    .digest('hex');
  const icon = new Identicon(btoa(Math.random()).substring(0, 30), {
    size: 64,
    format: 'svg'
  }).toString();

  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        {
          task: action.task,
          date: Date.now(),
          icon,
          key
        }
      ];
    }
    default:
      return state;
  }
}

export default todoReducer;
