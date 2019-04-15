import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Column from './Column';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
`;

const Input = styled.input`
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
  transition: box-shadow var(300ms);
  & ::placeholder {
    color: #b0bec5;
  }
  & :focus {
    outline: none;
    box-shadow: 0.2rem 0.8rem 1.6rem var(#4527a0);
  }
`;

// * This makes the styled component return as functional component
// ! Not currently required
// https://codepen.io/fionnachan/pen/pGXwxo?editors=0010

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
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;
    // Draggable ID is the task array index that was dragged

    // ! This is purely a placeholder and workaround no-unused-vars
    if (!draggableId) {
      return true;
    }

    if (!destination) {
      return true;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // User dropped back into same position
      return true;
    }
  };

  // Handle change and remove the error styles once len > 0
  handleChange = event => {
    // Doesn't validate the name field, assumes only one input
    // Check the value > 0 and remove error if it is
    // Don't modify error at all if not, to avoid error when user deletes their input but doesn't submit
    if (event.target.value.length > 0) {
      this.setState({ [event.target.name]: event.target.value, error: false });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
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
    const { todos } = this.props;
    const { task, error } = this.state;

    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <Input
            error={error}
            onChange={this.handleChange}
            value={task}
            type="text"
            placeholder="I need to do...."
            name="task"
          />
        </form>

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Column key="1" column={{ id: 1 }} todos={todos} />
        </DragDropContext>
      </Container>
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
