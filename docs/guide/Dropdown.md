---
title: Dropdown
order: 7
toc: menu
nav:
  title: Guide
  order: 1
---

## DateRange

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

const options = [{ value: 'potter', label: 'Harry Potter' }, { value: 'granger', label: 'Hermione Granger' }];

export default () => (
  <AntForm
    object={{
      name: undefined,
      nameMultiple: ['potter', 'granger']
    }}
    onChange={(value, values) => console.log("onChange", values)}
    layout="vertical"
    schema={[
      {
        name: 'name',
        label: 'Single',
        input: {
          type: 'dropdown',
          options: options
        }
      },
      {
        name: 'name',
        label: 'With placeholder',
        input: {
          type: 'dropdown',
          options: options,
          inputProps: {
            placeholder: 'Non renseigné'
          }
        }
      },
      {
        name: 'nameMultiple',
        label: 'Multiple',
        input: {
          type: 'dropdown',
          options: options,
          inputProps: {
            multiple: true
          }
        }
      },
    ]}
  />
);
```

<API src="../../src/ant-form/AntForm/fields/Dropdown.tsx"></API>

