import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { distanceInWordsToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 5px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  background-color: ${props => (props.isDragging ? '#C9FBFF' : '#ffffff')};
  border: ${props => (props.isDragging ? '1px solid #82b7bb' : 'none')};
`;

const Icon = styled.div`
  margin: 5px;
  grid-column: span 1
  display: flex;
  align-items: center;
  justify-content: center;
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

const Toggle = styled(Button)`
  box-shadow: 0px 5px 0px 0px #15b358;
  background-color: #2ecc71;
  color: #000;
  width: 100%;
  border: none;
  &:hover {
    background-color: #48e68b;
  }
`;

const Edit = styled(Button)`
  box-shadow: 0px 5px 0px 0px #a3ab00;
  background-color: #f7ff58;
  color: #000;
  width: auto;
  border: none;
  margin: 0 2px 0 2px;
  &:hover {
    background-color: #e4ec37;
    box-shadow: 0px 5px 0px 0px #a3ab00;
  }
`;

const Delete = styled(Button)`
  box-shadow: 0px 5px 0px 0px #82b7bb;
  border: none;
  background-color: #c9fbff;
  color: #000;
  width: auto;
  margin: 0 2px 0 2px;
  &:hover {
    background-color: #b3eaee;
    box-shadow: 0px 5px 0px 0px #82b7bb;
  }
`;

const Action = styled.div`
  grid-column: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  & ${Edit}, ${Delete} {
    color: #264653;
    opacity: 0;
  }
  &:hover ${Edit}, :hover ${Delete} {
    opacity: 1;
  }
`;
const Content = styled.div`
  grid-column: span 5;
  padding: 4px;
  & p {
    color: #ff934f;
    margin: 4px 0;
  }
  & p:first-child {
    font-size: 1.2em;
    font-weight: bold;
    color: #264653;
  }
`;

class Task extends Component {
  handleToggle = (todo, index, e) => {
    e.preventDefault();

    const { toggleTodo } = this.props;
    toggleTodo(todo, index);
  };

  handleEdit = (todo, index, e) => {
    // First lets remove the todo form the list
    e.preventDefault();

    const { removeTodo } = this.props;
    removeTodo(todo, index);

    // Update the form to include the task
    // This won't work as the form is in the Todos component
    // Edit in place would be better.
    // this.setState({ task: todo.task });
  };

  render() {
    const { handleEdit, handleToggle } = this;
    const { todo, index, removeTodo } = this.props;

    return (
      <Draggable draggableId={todo.key} index={index}>
        {(provided, snapshot) => (
          <List
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Icon>
              <Toggle
                onClick={handleToggle.bind(this, todo, index)}
                role="button"
                tabIndex="0"
                onKeyPress={handleToggle.bind(this, todo, index)}
              >
                <FontAwesomeIcon
                  icon={todo.complete ? faCheckSquare : faSquare}
                />
              </Toggle>
            </Icon>

            <Content {...provided.dragHandleProps}>
              <p>{todo.task}</p>
              <p>
                Created{' '}
                {distanceInWordsToNow(todo.date, { includeSeconds: true })} ago
              </p>
            </Content>

            <Action>
              <Edit
                onClick={handleEdit.bind(this, todo, index)}
                role="button"
                onKeyPress={handleEdit.bind(this, todo, index)}
                tabIndex="0"
              >
                <FontAwesomeIcon icon={faEdit} />
              </Edit>
              <Delete
                onClick={removeTodo.bind(this, todo, index)}
                role="button"
                onKeyPress={removeTodo.bind(this, todo, index)}
                tabIndex="0"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Delete>
            </Action>
          </List>
        )}
      </Draggable>
    );
  }
}

Task.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  addTodo: PropTypes.func.isRequired,
  reorderTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    task: PropTypes.string,
    date: PropTypes.number,
    complete: PropTypes.bool,
    key: PropTypes.string
  }),
  index: PropTypes.number
};

Task.defaultProps = {
  todos: PropTypes.array,
  index: PropTypes.number,
  todo: PropTypes.shape({
    task: PropTypes.string,
    date: PropTypes.number,
    complete: PropTypes.bool,
    key: PropTypes.string
  })
};

export default Task;
