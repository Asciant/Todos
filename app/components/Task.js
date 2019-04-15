import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { distanceInWordsToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faEdit,
  faTrashAlt,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

const List = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 5px;
  margin-bottom: 10px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: span 2;
  color: black;
`;

const Drag = styled.div`
  grid-row: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #34d741;
`;
const Action = styled.div`
  grid-column: span 2;
  grid-row: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
  & span {
    padding: 5px;
    color: #34d741;
  }
`;
const Content = styled.div`
  grid-column: span 4;
  grid-row: span 2;
  padding: 4px;
  & p {
    color: #34d741;
    margin: 4px 0;
  }
  & p:first-child {
    font-size: 1.2em;
    font-weight: bold;
    color: #d533d6;
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

    console.log(this.props);

    return (
      <Draggable draggableId={todo.key} index={index}>
        {(provided, snapshot) => (
          <List
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Icon>
              <span
                onClick={handleToggle.bind(this, todo, index)}
                role="link"
                tabIndex="0"
                onKeyPress={handleToggle.bind(this, todo, index)}
              >
                <FontAwesomeIcon
                  size="2x"
                  icon={todo.complete ? faCheckSquare : faSquare}
                />
              </span>
            </Icon>

            <Content>
              <p>{todo.task}</p>
              <p>
                Created{' '}
                {distanceInWordsToNow(todo.date, { includeSeconds: true })} ago
              </p>
            </Content>

            <Drag {...provided.dragHandleProps}>
              <FontAwesomeIcon icon={faBars} size="2x" />
            </Drag>

            <Action>
              <span
                onClick={handleEdit.bind(this, todo, index)}
                role="link"
                onKeyPress={handleEdit.bind(this, todo, index)}
                tabIndex="0"
              >
                <FontAwesomeIcon size="2x" icon={faEdit} />
              </span>
              <span
                onClick={removeTodo.bind(this, todo, index)}
                role="link"
                onKeyPress={removeTodo.bind(this, todo, index)}
                tabIndex="0"
              >
                <FontAwesomeIcon size="2x" icon={faTrashAlt} />
              </span>
            </Action>
          </List>
        )}
      </Draggable>
    );
  }
}

export default Task;
