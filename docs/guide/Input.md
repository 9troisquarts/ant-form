---
title: Input
order: 5
toc: menu
nav:
  title: Guide
  order: 1
---

## Textarea

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
  <AntForm
    object={{
      text: 'Texte'
    }}
    onSubmit={(values) => console.log(values)}
    layout="horizontal"
    schema={[
      {
        name: 'text',
        label: 'Description',
        input: {
          type: 'text',
          inputProps: {
            autoSize: true
          }
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

### API

<API src="../../src/ant-form/AntForm/fields/Textarea.tsx" hideTitle></API>

## Search

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
  <AntForm
    object={{
      search: 'Texte'
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

### API

<API src="../../src/ant-form/AntForm/fields/Search.tsx" hideTitle></API>

