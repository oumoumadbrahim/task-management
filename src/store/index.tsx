'use client';
import { ITask } from '@api/types';
import React, { ReactNode, useReducer } from 'react';

enum E_ACTIONS {
  LOAD_TASKS = 'LOAD_TASKS',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  OPEN_MODAL = 'OPEN_MODAL',
  CHANGE_FILTER = 'CHANGE_FILTER',
}

interface IState {
  tasks: ITask[];
  taskFormModal: boolean;
  selectedStatus: ITask['status'] | 'all';
}

interface IContextModel {
  state: IState;
  dispatch: React.Dispatch<TAction>;
}

type TAction =
  | { type: E_ACTIONS.LOAD_TASKS; payload: ITask[] }
  | { type: E_ACTIONS.ADD; payload: ITask }
  | { type: E_ACTIONS.UPDATE; payload: ITask }
  | { type: E_ACTIONS.DELETE; payload: string }
  | { type: E_ACTIONS.OPEN_MODAL; payload: boolean }
  | { type: E_ACTIONS.CHANGE_FILTER; payload: IState['selectedStatus'] };

const defaultState: IState = {
  tasks: [],
  taskFormModal: false,
  selectedStatus: 'all',
};

const reducer = (state: IState, action: TAction): IState => {
  switch (action.type) {
    case E_ACTIONS.LOAD_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case E_ACTIONS.ADD:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case E_ACTIONS.UPDATE:
      return {
        ...state,
        tasks: state.tasks.map(item => (item.id === action.payload.id ? action.payload : item)),
      };

    case E_ACTIONS.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.payload),
      };
    case E_ACTIONS.OPEN_MODAL:
      return {
        ...state,
        taskFormModal: action.payload,
      };
    case E_ACTIONS.CHANGE_FILTER:
      return {
        ...state,
        selectedStatus: action.payload,
      };

    default:
      return state;
  }
};

export const Context = React.createContext({} as IContextModel);

export const TaskProvider: React.FC<{ children: ReactNode }> = props => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

export function useTaskActions() {
  const { state, dispatch } = React.useContext(Context);

  return {
    state,
    loadTasks: (tasks: ITask[]) =>
      dispatch({
        type: E_ACTIONS.LOAD_TASKS,
        payload: tasks,
      }),
    addTask: (task: ITask) =>
      dispatch({
        type: E_ACTIONS.ADD,
        payload: task,
      }),
    editTask: (task: ITask) =>
      dispatch({
        type: E_ACTIONS.UPDATE,
        payload: task,
      }),
    deleteTask: (id: string) =>
      dispatch({
        type: E_ACTIONS.DELETE,
        payload: id,
      }),
    openTaskForm: (open: boolean) =>
      dispatch({
        type: E_ACTIONS.OPEN_MODAL,
        payload: open,
      }),
    changeFilter: (status: IState['selectedStatus']) =>
      dispatch({
        type: E_ACTIONS.CHANGE_FILTER,
        payload: status,
      }),
  };
}
