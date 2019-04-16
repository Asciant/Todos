import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from '../containers/ColumnPage';

const Container = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  margin-bottom: 20px;
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

const New = styled(Button)`
  background-color: #55acee;
  box-shadow: 0px 5px 0px 0px #3c93d5;
  color: #000;
  width: 100%;
  border: none;
  &:hover {
    background-color: #6fc6ff;
  }
`;

const Item = styled.div`
  width: auto;
  padding: 5px;
  box-sizing: border-box;
  min-width: 400px;
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;
    const {
      columns,
      todos,
      reorderTodos,
      reorderColumns,
      updateTodoColumnAndReorder
    } = this.props;

    // draggableId is the key of the task's/column's that was dragged
    // console.log(draggableId);

    if (!destination) {
      // Nothing to do
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // User dropped back into same position
      return;
    }

    // * If the draggable is a column
    if (type === 'column') {
      // We only have one column - so don't get too fancy
      // const column = source.droppableId;
      const newColumnIds = Array.from(columns);
      newColumnIds.splice(source.index, 1);
      newColumnIds.splice(destination.index, 0, columns[source.index]);

      reorderColumns(newColumnIds);
      return;
    }

    // * If the draggable is a todo and it is being
    // * dropped inside the same droppable (todo list)
    // * Eg. Reorder in the same column
    const start = columns
      .map(c => {
        return c.key;
      })
      .indexOf(source.droppableId);

    const finish = columns
      .map(c => {
        return c.key;
      })
      .indexOf(destination.droppableId);

    if (start === finish) {
      const newTaskIds = todos.filter(t => t.column === source.droppableId);
      const draggedTodoId = todos.findIndex(t => t.key === draggableId);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, todos[draggedTodoId]);

      reorderTodos(newTaskIds, source.droppableId);

      return;
    }

    // * Task being dropped from one column to another
    // ? The order of the source is irrelivent
    // ? The key of the todo will be updated to reflect the new column anyway

    const draggedTodoId = todos.findIndex(t => t.key === draggableId);

    updateTodoColumnAndReorder(
      todos[draggedTodoId],
      draggedTodoId,
      destination.index,
      destination.droppableId
    );

    // reorderTodos(finishTaskIds, destination.droppableId);
  };

  render() {
    const { columns, addColumn } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ButtonContainer>
          <Item>
            <New onClick={addColumn.bind(this, null)}>Add a new column</New>
          </Item>
        </ButtonContainer>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {provided => (
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {columns.map((column, index) => (
                <Column
                  key={column.key}
                  column={column}
                  index={index}
                  {...provided.dragHandleProps}
                />
              ))}
              {provided.placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

Home.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  reorderTodos: PropTypes.func.isRequired,
  addColumn: PropTypes.func.isRequired,
  reorderColumns: PropTypes.func.isRequired,
  updateTodoColumnAndReorder: PropTypes.func.isRequired
};

Home.defaultProps = {
  todos: PropTypes.array,
  columns: PropTypes.array
};

export default Home;
