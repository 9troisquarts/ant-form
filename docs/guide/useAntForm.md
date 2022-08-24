---
title: useAntForm Hook
order: 3
toc: menu
nav:
  title: Guide
  order: 1
---

## With useAntForm

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

const {
  object,
  onReset,
  onChange,
} = useAntForm({ firstname: 'Toto' });

export default () => (
  <div>
    <AntForm
      object={object}
      onChange={onChange}
      schema={[
        [
          {
            name: 'firstname',
            label: 'Firstname',
            input: {
              type: 'string',
            },
            colProps: {
              xs: 24,
              md: 12,
              lg: 12
            }
          }, {
            name: 'lastname',
            label: 'Lastname',
            input: {
              type: 'string'
            },
            colProps: {
              xs: 24,
              md: 12,
              lg: 12
            }
          }
        ],
        [
          {
            name: 'select',
            label: 'Select',
            input: {
              type: 'select',
              options: [{
                label: 'Option 1',
                value: 'one'
              }, {
                label: 'Option 2',
                value: 'two'
              }, {
                label: 'Option 3',
                value: 'three'
              }]
            },
            colProps: {
              xs: 24,
              md: 12,
            }
          }
        ],
        [{
          name: 'date',
          label: 'Datepicker',
          input: {
            type: 'date',
            inputProps: {
              format: 'L'
            }
          },
          colProps: {
            xs: 12,
          }
        },
        ],
        {
          name: 'textarea',
          label: 'Textarea',
          input: {
            type: 'text'
          }
        },
      ]}
    />
    <a onClick={onReset}>Reset</a>
  </div>
)
```
