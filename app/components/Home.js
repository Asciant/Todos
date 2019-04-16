import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
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

  addNewColumn = () => {
    // this.setState(prevState => {
    //   const { columns } = prevState;
    //   const newIndex = columns.length + 1;
    //   columns.push({ id: newIndex });
    //   return {
    //     ...prevState,
    //     columns
    //   };
    // });
  };

  render() {
    const { columns } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ButtonContainer>
          <Item>
            <New onClick={this.addNewColumn.bind(null)}>Add a new column</New>
          </Item>
        </ButtonContainer>
        <Container>
          {columns.map(column => {
            return <Column key={column.id} column={column} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

Home.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  reorderTodos: PropTypes.func.isRequired
};

Home.defaultProps = {
  todos: PropTypes.array,
  columns: PropTypes.array
};

export default Home;
