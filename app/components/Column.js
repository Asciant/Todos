import React, { Component } from 'react';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const TaskList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  margin-top: 10px;
`;

class Column extends Component {
  render() {
    const { column, todos } = this.props;

    return (
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <List relaxed verticalAlign="middle" key="some-key">
              {todos.map((d, i) => (
                <Task key={d.key} todo={d} index={i} />
              ))}
            </List>
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    );
  }
}

export default Column;
