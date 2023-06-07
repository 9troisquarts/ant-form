---
title: Datetime
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
        name: 'time',
        label: 'DateTime',
        input: {
          type: 'datetime'
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

<API src="../../src/ant-form/AntForm/fields/DatetimeInput.tsx"></API>

