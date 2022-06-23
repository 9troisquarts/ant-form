import { useReducer } from 'react';
import isEqual from 'lodash/isEqual';

type Action = {
  payload: any;
  type: string;
};

type StateType = {
  object: any;
  dirty: boolean;
  initialValue: any;
};

const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'set':
      return {
        object: action.payload,
        dirty: false,
        initialValue: action.payload,
      };
    case 'change':
      const nextObject = {
        ...(state.object || {}),
        ...action.payload,
      };
      return {
        object: nextObject,
        dirty: !isEqual(nextObject, state.initialValue),
      };
  }
};

export const useAntForm = (initialValue: any) => {
  const [state, dispatch] = useReducer(reducer, {
    object: initialValue,
    initialValue: initialValue,
    dirty: false,
  });

  const set = (object: any) => dispatch({ type: 'set', payload: object });
  const onChange = (_value: any, allValue: any) => {
    dispatch({ type: 'change', payload: allValue });
  };
  const onCancel = () => dispatch({ type: 'set', payload: initialValue });
  const onReset = () => dispatch({ type: 'set', payload: {} });
  return {
    object: (state as StateType).object,
    dirty: (state as StateType).dirty,
    dispatch,
    onCancel,
    onReset,
    onChange,
    set,
  };
};

export default useAntForm;
