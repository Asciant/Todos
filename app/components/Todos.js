import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

import Column from '../containers/ColumnPage';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  padding: 45px;
  background-color: #ffffff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const BackContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
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
  width: 100%;
`;

const Button = styled.button`
  border-radius: 5px;
  padding: 15px 25px;
  font-size: 22px;
  text-decoration: none;
  display: inline-block;
  &:active {
    transform: translate(0px, 5px);
    -webkit-transform: translate(0px, 5px);
    box-shadow: 0px 1px 0px 0px;
  }
`;

const Back = styled(Button)`
  background-color: #55acee;
  box-shadow: 0px 5px 0px 0px #3c93d5;
  color: #000;
  width: 100%;
  border: none;
  &:hover {
    background-color: #6fc6ff;
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
    const { destination, source } = result;
    const { todos, reorderTodos } = this.props;

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

    // We don't actually use the draggableId
    // Our array is based on numerical indexes
    // React Beautiful DND lost its mind when I provided 0 as the id

    // We only have one column - so don't get too fancy
    // const column = source.droppableId;
    const newTaskIds = Array.from(todos);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, todos[source.index]);

    reorderTodos(newTaskIds);
  };

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
    const { task, error } = this.state;

    return (
      <React.Fragment>
        <BackContainer>
          <Item>
            <Link to={routes.HOME}>
              <Back>Return home</Back>
            </Link>
          </Item>
        </BackContainer>

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
          </Item>

          <Item>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Column key="1" column={{ id: 1 }} />
            </DragDropContext>
          </Item>
        </Container>
      </React.Fragment>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  addTodo: PropTypes.func.isRequired,
  reorderTodos: PropTypes.func.isRequired
};

Todos.defaultProps = {
  todos: PropTypes.array
};

export default Todos;
