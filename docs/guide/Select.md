---
title: Select
order: 6
toc: menu
nav:
  title: Guide
  order: 29
---

## Select

### Single

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
  <AntForm
    object={{
      single: 'granger',
    }}
    onChange={(value, values) => console.log(values)}
    layout="vertical"
    schema={[
      {
        name: 'single',
        input: {
          type: 'select',
          options: [
            {
              label: 'Hermione',
              value: 'granger',
            },
            {
              label: 'Harry',
              value: 'potter',
            },
            {
              label: 'Frédéric',
              value: 'fred',
            },
          ],
        },
      },
    ]}
  />
);
```

### Multiple

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
  <AntForm
    object={{
      multiple: null,
    }}
    onChange={(value, values) => console.log(values)}
    layout="vertical"
    schema={[
      {
        name: 'multiple',
        input: {
          type: 'select',
          options: [
            {
              label: 'Hermione',
              value: 'granger',
            },
            {
              label: 'Harry',
              value: 'potter',
            },
          ],
          inputProps: {
            mode: 'multiple',
            placeholder: 'Select a wizard...',
          },
        },
      },
    ]}
  />
);
```

### Multiple

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
  <AntForm
    object={{
      transfer: null,
    }}
    onChange={(value, values) => console.log(values)}
    layout="vertical"
    schema={[
      {
        name: 'transfer',
        input: {
          type: 'transfer',
          options: [
            {
              label: 'Hermione',
              value: 'granger',
            },
            {
              label: 'Harry',
              value: 'potter',
            },
          ],
          titles: ['Colonne A', 'Colonne B'],
        },
      },
    ]}
  />
);
```
