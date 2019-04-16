import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../containers/TaskPage';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  padding: 45px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const TaskList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#f2f2f2' : '#ffffff')};
  margin-top: 10px;
`;

const Item = styled.div`
  display: grid;
  padding: 5px;
`;

const Input = styled.input`
  outline: 0;
  background: #f2f2f2;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  font-size: 14px;
  box-sizing: border-box;
  border-color: ${props => (props.error ? 'red' : 'none')};
  background-color: ${props => (props.error ? 'red' : 'none')};
  min-width: 300px;
`;

class Column extends Component {
  constructor() {
    super();
    // React state
    this.state = {
      task: '',
      error: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle change and remove the error styles once len > 0
  handleChange = event => {
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
    const { column, todos } = this.props;
    const { task, error } = this.state;

    return (
      <Container>
        <Item>
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

          <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {todos.map((d, i) => (
                  <Task key={d.key} todo={d} index={i} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Item>
      </Container>
    );
  }
}

// TODO Move these into a file that can be imported for any redux connected component
Column.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  column: PropTypes.shape({ id: PropTypes.number }),
  addTodo: PropTypes.func.isRequired,
  reorderTodos: PropTypes.func.isRequired
};

Column.defaultProps = {
  todos: PropTypes.array,
  column: PropTypes.object
};

export default Column;
