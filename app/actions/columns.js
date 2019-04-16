import {
  ADD_COLUMN,
  EDIT_COLUMN,
  REMOVE_COLUMN,
  REORDER_COLUMN
} from '../constants/actions';

export function addColumn(column) {
  return {
    type: ADD_COLUMN,
    column
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

export function reorderColumn(orderedColumns) {
  return {
    type: REORDER_COLUMN,
    orderedColumns
  };
}
