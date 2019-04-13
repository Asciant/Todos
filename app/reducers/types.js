import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type todoStateType = Array<{}>;

export type Action = {
  +type: string
};

export type GetState = () => todoStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
