import { useReducer } from 'react';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';

type Action = {
  payload: any;
  changes?: string[];
  type: string;
};

type State<T> = {
  object: T;
  dirty: boolean;
  initialValue: T;
  changes: string[];
};

const reducer = <RecordType>(state: State<RecordType>, action: Action): State<RecordType> => {
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
        ...state,
        object: nextObject,
        dirty: !isEqual(nextObject, state.initialValue),
        changes: uniq([...state.changes, ...(action.changes || [])]),
      };
    default:
      return state;
  }
};

export const useAntForm = <T>(initialValue: T) => {
  const defaultValue = {
    object: initialValue,
    initialValue: initialValue,
    dirty: false,
    changes: [],
  };
  const [state, dispatch] = useReducer<React.Reducer<State<T>, Action>>(reducer<T>, defaultValue);

  const set = (object: any) => dispatch({ type: 'set', payload: object });
  const onChange = (value: any, allValue: any) => {
    dispatch({ type: 'change', payload: allValue, changes: Object.keys(value) });
  };
  const onCancel = () => dispatch({ type: 'set', payload: initialValue });
  const onReset = () => dispatch({ type: 'set', payload: {} });
  return {
    object: state.object,
    dirty: state.dirty,
    changes: state.changes,
    dispatch,
    onCancel,
    onReset,
    onChange,
    set,
  };
};

export default useAntForm;
