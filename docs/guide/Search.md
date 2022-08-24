---
title: Input
order: 5
toc: menu
nav:
  title: Guide
  order: 1
---

## Search

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
  <AntForm
    object={{
      search: 'Recherche'
    }}
    onSubmit={(values) => console.log(values)}
    layout="horizontal"
    schema={[
      {
        name: 'search',
        label: 'DateRange',
        input: {
          type: 'search'
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

<API src="../../src/ant-form/AntForm/fields/Search.tsx"></API>

