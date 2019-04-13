import * as Identicon from 'identicon.js';
import * as Md5 from 'md5.js';

const hash = new Md5();
const Icon = new Identicon();

function todoReducer(state = [], action) {
  console.log(`Reducer with action ${action.type}`);
  switch (action.type) {
    case 'ADD_TODO': {
      return [
        ...state,
        {
          task: action.task,
          date: Date.now(),
          icon: Icon.default(hash, { size: 64, format: 'svg' }).toString(),
          key: hash
            .default()
            .update(btoa(Math.random()).substring(0, 30))
            .digest('hex')
        }
      ];
    }
    default:
      return state;
  }
}

export default todoReducer;
