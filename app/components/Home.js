import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import routes from '../constants/routes';

export default class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div data-tid="container">
        <h2>Home</h2>
        <p>
          <FontAwesomeIcon icon={faCoffee} />
        </p>
        <Link to={routes.COUNTER}>to Counter</Link>
      </div>
    );
  }
}
