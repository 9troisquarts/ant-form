import { useReducer } from 'react';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';

type Action<T> = {
  payload: T;
  changes?: string[];
  type: string;
};

type State<T> = {
  object: T;
  dirty: boolean;
  initialValue: T;
  changes: string[];
};

const reducer = <RecordType>(
  state: State<RecordType>,
  action: Action<RecordType>,
): State<RecordType> => {
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
  const [state, dispatch] = useReducer<React.Reducer<State<T>, Action<T>>>(
    reducer<T>,
    defaultValue,
  );

  const set = (object: T) => dispatch({ type: 'set', payload: object });
  const onChange = (value: T, allValue: T) => {
    dispatch({ type: 'change', payload: allValue, changes: Object.keys(value as any) });
  };
  const onCancel = () => dispatch({ type: 'set', payload: initialValue });
  const onReset = () => dispatch({ type: 'set', payload: {} as T });

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
