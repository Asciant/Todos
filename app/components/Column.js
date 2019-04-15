import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Task from '../containers/TaskPage';

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
            {todos.map((d, i) => (
              <Task key={d.key} todo={d} index={i} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
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
