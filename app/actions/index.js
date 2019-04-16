import * as todoActions from './todos';
import * as columnActions from './columns';

const actions = { ...todoActions, ...columnActions };

export default actions;
