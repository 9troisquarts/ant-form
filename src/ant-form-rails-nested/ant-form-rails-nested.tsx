// @ts-nocheck
import React, { useEffect, useReducer } from 'react';
import { Form, Row, Col, Button, FormProps } from 'antd';
import isEqual from 'lodash/isEqual';
import { useDebounceFn } from 'ahooks';
import get from 'lodash/get';
import { AntSchema } from '../ant-form/AntForm/types';
import AntForm from '../ant-form';

type ItemHeaderParams = {
  index: number;
  add: () => void;
  remove: (index: number) => void;
  field: any;
};

/* Return true if props does not change */
const memoOnlyForKeys = (keys: string[]): any => (
  prev: any,
  next: any,
): boolean => {
  /* Return true if key is not equal, then some is break and return true */
  const equal = !keys.some(key => {
    if (get(prev, key) === get(next, key)) return false;
    return !isEqual(get(prev, key), get(next, key));
  });
  return equal;
};

type NestedOptions = {
  formProps?: FormProps;
  readOnly?: boolean;
  itemHeader: (args: ItemHeaderParams) => React.ReactNode;
  onChange: (value: Array<any>) => void;
  beforeChange: (item: any, values: any) => any[];
  schema: AntSchema | ((item: any, index: number, ) => AntSchema);
  maxLength?: number;
  separator?: React.ReactNode;
  error?: any;
  remove: string | React.ReactNode;
  add: string | React.ReactNode;
  className?: string;
}
export type AntFormRailsNestedProps = {
  type: string;
  name: string;
  value: Array<any>;
  className?: string;
  inputProps?: NestedOptions;
  renderLabel?: (label: string | React.ReactNode) => string | React.ReactNode | React.ReactNode[];
} & NestedOptions;

const AntFormRailsNestedItemForm: React.FC<AntFormRailsNestedProps> = props => {
  const {
    item,
    onAdd,
    itemHeader,
    onRemove,
    index,
    number,
    readOnly,
    layout = 'horizontal',
    renderLabel,
    onChange,
    schema,
    removeComponent,
    errors,
    formProps= {},
    separator = null,
  } = props;
  if (item._destroy) return null;
  return (
    <Row>
      {itemHeader && (
        <Col span={24}>
          {itemHeader({
            readOnly,
            add: onAdd,
            remove: () => onRemove(index),
            field: item,
            index,
          })}
        </Col>
      )}
      <Col span={24} className="nested-form">
        <AntForm
          renderLabel={renderLabel}
          layout={layout}
          {...formProps}
          readOnly={readOnly}
          // @ts-ignore
          onChange={(_values, allValues) => onChange(index, allValues)}
          schema={typeof schema === 'function' ? schema(item, index, { onRemove: () => onRemove(index), onAdd, number }) : schema}
          object={item}
          errors={errors}
        />
      </Col>
      {!readOnly && removeComponent ? (
        <Col span={24}>
          <Form.Item>
            {typeof removeComponent === 'function'
              ? removeComponent(() => onRemove(index))
              : removeComponent}
          </Form.Item>
        </Col>
      ) : null}
      {separator}
    </Row>
  );
};

const MemoizedItemForm = React.memo(
  AntFormRailsNestedItemForm,
  memoOnlyForKeys(['item', 'schema', 'errors']),
);

enum Actions {
  SET = 'SET_VALUES',
  CHANGE = 'CHANGE_VALUES',
  REMOVE = 'REMOVE_VALUES',
  ADD = 'ADD',
}

const reducer = ({ onChange, beforeChange }) => (state, action) => {
  switch (action.type) {
    case Actions.SET:
      return action.payload;
    case Actions.CHANGE:
      const nextState = [...state];
      let nextItem: any = {};
      if (beforeChange) {
        nextItem = beforeChange(nextState[action.index], action.payload);
      } else {
        nextItem = {
          ...nextState[action.index],
          ...action.payload,
        };
      }
      nextState[action.index] = nextItem;
      onChange(nextState);
      return nextState;
    case Actions.ADD:
      const addNextState = [...(state || []), {}];
      onChange(addNextState);
      return addNextState;
    case Actions.REMOVE:
      const removeNextState = [...(state || [])];
      let item = { ...removeNextState[action.index] };
      if (item.id) removeNextState[action.index] = { ...item, _destroy: true };
      else removeNextState.splice(action.index, 1);
      onChange(removeNextState);
      return removeNextState;
    default:
      return state;
  }
};

const AntFormRailsNestedComponent: React.FC<AntFormRailsNestedProps> = props => {
  const {
    value,
    error,
    separator,
    schema,
    maxLength,
    itemHeader,
    renderLabel,
    layout = 'horizontal',
    className = '',
    formProps = {},
    remove: removeComponent,
    add: addComponent,
    beforeChange,
    readOnly = false,
  } = props;

  const { run: onChange } = useDebounceFn(values => {
    if (props.onChange) props.onChange(values);
  }, { wait: 200 });
  const [internalValue, dispatch] = useReducer(
    reducer({ onChange, beforeChange }),
    value || [],
  );

  useEffect(() => dispatch({ type: Actions.SET, payload: value || [] }), [
    value,
  ]);

  const onAdd = () => dispatch({ type: Actions.ADD });
  const onRemove = (index: number) => dispatch({ type: Actions.REMOVE, index });
  const triggerChange = (index: number, values: any) =>
    dispatch({ type: Actions.CHANGE, payload: values, index });
  let i = 0;
  return (
    <div className={className}>
      {(internalValue || []).map((item, index) => {
        if (!item._destroy) i = i+1;
        return (
          <MemoizedItemForm
            layout={layout}
            renderLabel={renderLabel}
            item={item}
            index={index}
            number={i}
            formProps={formProps}
            itemHeader={itemHeader}
            onRemove={onRemove}
            removeComponent={removeComponent}
            schema={schema}
            onAdd={onAdd}
            onChange={triggerChange}
            errors={get(error, index, {})}
            readOnly={readOnly}
            separator={index < internalValue.length - 1 && separator && separator}
          />
        )
      })}
      {!readOnly &&
        (!maxLength ||
          (internalValue || []).filter(i => !i._destroy).length <
            maxLength) && (
          <>
            {addComponent ? (
              <div>
                {typeof addComponent === 'function' ? (
                  addComponent(onAdd)
                ) : (
                  <Button type="dashed" onClick={onAdd}>
                    {addComponent}
                  </Button>
                )}
              </div>
            ) : (
              <a onClick={onAdd}>Add</a>
            )}
          </>
        )}
    </div>
  );
};

export const AntFormRailsNested = React.memo(
  AntFormRailsNestedComponent,
  memoOnlyForKeys(['value', 'schema', 'error']),
);

export default AntFormRailsNested;
