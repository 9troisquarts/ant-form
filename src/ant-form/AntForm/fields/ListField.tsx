import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import { AntSchema, ListInputProps } from '../types';
import FieldItem from '../_utils/FieldItem';

type ListFieldProps<RecordType> = {
  name: string;
  schema: AntSchema<RecordType>;
  errors: any;
  object: any;
  inputProps: ListInputProps;
};

const ListField: React.FC<ListFieldProps<any>> = (props) => {
  const {
    name,
    schema,
    errors,
    inputProps: { itemHeader, remove: removeComponent, add: addComponent },
  } = props;
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Row key={field.name}>
              {itemHeader && <Col span={24}>{itemHeader({ add, remove, field })}</Col>}
              {schema.map((item, i) => (
                <FieldItem
                  item={item}
                  errors={errors}
                  fieldName={field.name}
                  fieldKey={field.fieldKey}
                  key={i}
                />
              ))}
              {removeComponent ? (
                <Form.Item>
                  {typeof removeComponent === 'function' ? (
                    removeComponent(remove)
                  ) : (
                    <Button type="dashed" onClick={() => add()}>
                      {removeComponent}
                    </Button>
                  )}
                </Form.Item>
              ) : null}
            </Row>
          ))}
          {add ? (
            <Form.Item>
              {typeof addComponent === 'function' ? (
                addComponent(add)
              ) : (
                <Button type="dashed" onClick={() => add()}>
                  {addComponent}
                </Button>
              )}
            </Form.Item>
          ) : (
            'Add'
          )}
        </>
      )}
    </Form.List>
  );
};

export default ListField;
