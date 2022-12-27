import { useReducer } from 'react';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';

type Action = {
  payload: any;
  changes?: string[];
  type: string;
};

type StateType = {
  object: any;
  dirty: boolean;
  initialValue: any;
  changes: string[];
};

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'set':
      return {
        object: action.payload,
        dirty: false,
        initialValue: action.payload,
        changes: [],
      };
    case 'change':
      const nextObject = {
        ...(state.object || {}),
        ...action.payload,
      };
      return {
        object: nextObject,
        dirty: !isEqual(nextObject, state.initialValue),
        changes: uniq([...state.changes, ...(action.changes || [])])
      };
  }
};

export const useAntForm = (initialValue: any) => {
  const [state, dispatch] = useReducer(reducer, {
    object: initialValue,
    initialValue: initialValue,
    dirty: false,
    changes: []
  });

  const set = (object: any) => dispatch({ type: 'set', payload: object });
  const onChange = (value: any, allValue: any) => {
    dispatch({ type: 'change', payload: allValue, changes: Object.keys(value) });
  };
  const onCancel = () => dispatch({ type: 'set', payload: initialValue });
  const onReset = () => dispatch({ type: 'set', payload: {} });
  return {
    object: (state as StateType).object,
    dirty: (state as StateType).dirty,
    changes: (state as StateType).changes,
    dispatch,
    onCancel,
    onReset,
    onChange,
    set,
  };
};

export default useAntForm;
