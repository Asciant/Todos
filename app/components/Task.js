import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { List, Button, Checkbox } from 'semantic-ui-react';
import { distanceInWordsToNow } from 'date-fns';

const Container = styled.div`
  border: 1px solid lightgrey;
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
    // this.setState({ task: todo.task });
  };

  // This is just a placeholder
  removeTodo = () => {};

  render() {
    const { handleEdit, handleToggle, removeTodo } = this;
    const { todo, index } = this.props;

    return (
      <List.Item key={todo.key}>
        <Draggable draggableId={todo.key} index={index}>
          {(provided, snapshot) => (
            <Container
              {...provided.draggableProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
              <List.Content floated="right">
                <Button onClick={handleEdit.bind(null, todo, index)}>
                  Edit
                </Button>
                <Button onClick={removeTodo.bind(null, todo, index)}>
                  Delete
                </Button>
              </List.Content>
              <List.Content floated="left" {...provided.dragHandleProps}>
                <Checkbox
                  label={todo.task}
                  name="completed"
                  checked={todo.complete}
                  onChange={handleToggle.bind(null, todo, index)}
                  style={{
                    textDecoration: todo.complete ? 'line-through' : 'none'
                  }}
                />
                <p>
                  {distanceInWordsToNow(todo.date, {
                    includeSeconds: true
                  })}{' '}
                  ago
                </p>
              </List.Content>
            </Container>
          )}
        </Draggable>
      </List.Item>
    );
  }
}

export default Task;
