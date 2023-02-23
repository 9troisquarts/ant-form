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
    onplace={true}
    object={{
      firstname: 0,
      lastname: 'TP',
    }}
    onChange={onChange}
    cancelText="Annuler"
    submitText="Modifier"
    loading={false}
    schema={[
      [
        {
          label: 'Firstname',
          name: 'firstname',
          input: {
            type: 'string',
          },
          required: true,
          colProps: {
            xs: 12,
            md: 12,
            lg: 12,
          },
        },
        {
          label: 'Lastname',
          name: 'lastname',
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
      [
        {
          label: 'City',
          name: 'city',
          input: {
            type: 'string',
          },
          required: true,
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
      ],
    ]}
  />
);
```

<API src="../../src/ant-form/AntForm/fields/ContentEditableInput.tsx"></API>
