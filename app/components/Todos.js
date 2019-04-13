import React, { Component } from 'react';
import { Input, List, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { distanceInWordsToNow } from 'date-fns';

class Todos extends Component {
  constructor(props) {
    super(props);

    // React state
    this.state = {
      task: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = e => {
    e.preventDefault();
    const { task } = this.state;
    const { addTodo } = this.props;
    addTodo(task);
    this.setState({ task: '' });
  };

  render() {
    const { todos } = this.props;
    const { task } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            size="large"
            fluid
            focus
            placeholder="I need to do...."
            name="task"
            onChange={this.handleChange}
            value={task}
          />
        </form>

        <List relaxed verticalAlign="middle">
          {todos.map(d => (
            <List.Item key={d.key}>
              <Image avatar src={`data:image/svg+xml;base64,${d.icon}`} />
              <List.Content>
                <List.Header as="a">{d.task}</List.Header>
                Created{' '}
                {distanceInWordsToNow(d.date, {
                  includeSeconds: true
                })}{' '}
                ago
              </List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  addTodo: PropTypes.func.isRequired
};

Todos.defaultProps = {
  todos: PropTypes.array
};

export default Todos;
