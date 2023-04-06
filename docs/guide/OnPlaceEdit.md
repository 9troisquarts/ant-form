---
title: OnPlaceEdit
order: 12
toc: menu
nav:
  title: Guide
  order: 29
---

## OnPlaceEdit

```tsx
import AntForm from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';
import React from 'react';

const onChange = () => {};

export default () => (
  <AntForm
    layout="vertical"
    onPlace
    object={{
      firstname: 0,
      lastname: 'TP',
    }}
    onChange={(v) => console.log(v)}
    cancelText="Annuler"
    submitText="Modifier"
    loading={false}
    schema={[
      [
        {
          label: 'String',
          name: 'string',
          input: {
            type: 'string',
          },
          colProps: {
            xs: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          label: 'Boolean',
          name: 'boolean',
          input: {
            type: 'boolean',
          },
          colProps: {
            xs: 12,
            md: 12,
            lg: 12,
          },
        },
      ],
      [
        {
          label: 'City',
          name: 'city',
          input: {
            type: 'string',
          },
          colProps: {
            xs: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          label: 'ZIP Code',
          name: 'postcode',
          input: {
            type: 'string',
          },
          colProps: {
            xs: 12,
            md: 12,
            lg: 12,
          },
        },
      ],
      [<h2>Autre zone</h2>],
      [
        {
          label: 'Commentaire',
          name: 'comment',
          input: {
            type: 'text',
          },
          colProps: {
            xs: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          name: 'select',
          label: 'Select',
          input: {
            type: 'select',
            options: [
              {
                label: 'Option 1',
                value: 'one',
              },
              {
                label: 'Option 2',
                value: 'two',
              },
              {
                label: 'Option 3',
                value: 'three',
              },
            ],
          },
          colProps: {
            xs: 24,
            md: 12,
          },
        },
      ],
    ]}
  />
);
```

<API src="../../src/ant-form/AntForm/fields/ContentEditableInput.tsx"></API>
