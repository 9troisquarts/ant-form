---
title: DateRange
order: 4
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

export default () => (
  <AntForm
    object={{}}
    onSubmit={(values) => console.log(values)}
    layout="horizontal"
    schema={[
      {
        name: ['start', 'end'],
        label: 'DateRange',
        input: {
          type: 'daterange'
        },
        colProps: {
          xs: 24,
          md: 12,
          lg: 12
        }
      }
    ]}
  />
);
```

<API src="../../src/ant-form/AntForm/fields/DateRange.tsx"></API>

