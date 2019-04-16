// App container for mapStateToProps and mapDispatchToState
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actions from '../actions/index';

import Home from '../components/Home';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
