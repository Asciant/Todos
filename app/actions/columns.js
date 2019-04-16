import {
  ADD_COLUMN,
  EDIT_COLUMN,
  REMOVE_COLUMN,
  REORDER_COLUMN
} from '../constants/actions';

export function addColumn(name) {
  return {
    type: ADD_COLUMN,
    name
  };
}

export function removeColumn(column, index) {
  return {
    type: REMOVE_COLUMN,
    column,
    index
  };
}

export function editColumn(column, index) {
  return {
    type: EDIT_COLUMN,
    column,
    index
  };
}

export function reorderColumns(orderedColumns) {
  return {
    type: REORDER_COLUMN,
    orderedColumns
  };
}
