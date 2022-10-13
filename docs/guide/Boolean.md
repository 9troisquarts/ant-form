---
title: Boolean
order: 5
toc: menu
nav:
  title: Guide
  order: 1
---

## Boolean

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
  <>
    <AntForm
      object={{
        boolean: false,
        inverted: false
      }}
      onSubmit={(values) => console.log(values)}
      layout="horizontal"
      schema={[
        {
          name: 'boolean',
          input: {
            type: 'boolean',
            inputProps: {
              text: 'Classique'
            }
          }
        },
        {
          name: 'inverted',
          input: {
            type: 'boolean',
            inputProps: {
              inverted: true,
              text: 'Inverted'
            }
          }
        }
      ]}
    />
  </>
);
```

### API

<API src="../../src/ant-form/AntForm/fields/Boolean.tsx" hideTitle></API>

