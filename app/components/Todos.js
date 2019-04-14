import React, { Component } from 'react';
import { Input, List, Button, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { distanceInWordsToNow } from 'date-fns';

class Todos extends Component {
  constructor(props) {
    super(props);

    // React state
    this.state = {
      task: '',
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle change and remove the error styles once len > 0
  handleChange = (e, { name, value }) => {
    // Doesn't validate the name field, assumes only one input
    // Check the value > 0 and remove error if it is
    // Don't modify error at all if not, to avoid error when user deletes their input but doesn't submit
    if (value.length > 0) {
      this.setState({ [name]: value, error: false });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleUpdate = (todo, index, e) => {
    // First lets remove the todo form the list
    e.preventDefault();
    const { removeTodo } = this.props;
    removeTodo(todo, index);

    // Update the form to include the task
    this.setState({ task: todo.task });
  };

  handleSubmit = e => {
    e.preventDefault();

    // Destructure all the objects
    const { task } = this.state;
    const { addTodo } = this.props;

    // Check the task length, apply error visual effect if len 0
    // Add the todo and reset the form if a string has been provided
    if (task.length === 0) {
      this.setState({ task, error: true });
    } else {
      addTodo(task);
      this.setState({ task: '', error: false });
    }
  };

  render() {
    const { todos, removeTodo } = this.props;
    const { task, error } = this.state;
    const { handleUpdate } = this;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input
            size="large"
            fluid
            focus
            error={error}
            placeholder="I need to do...."
            name="task"
            onChange={this.handleChange}
            value={task}
          />
        </form>

        <List relaxed verticalAlign="middle">
          {todos.map((d, i) => (
            <List.Item key={d.key}>
              <List.Content floated="right">
                <Button onClick={handleUpdate.bind(null, d, i)}>Edit</Button>
                <Button onClick={removeTodo.bind(null, d, i)}>Delete</Button>
              </List.Content>
              <List.Content floated="left">
                <Checkbox label={d.task} />
                <p>
                  {distanceInWordsToNow(d.date, {
                    includeSeconds: true
                  })}{' '}
                  ago
                </p>
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
  addTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
};

Todos.defaultProps = {
  todos: PropTypes.array
};

export default Todos;
