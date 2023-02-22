---
title: Color-picker
order: 8
toc: menu
---

## Chrome (default)

```tsx
import React from 'react';
import AntForm from '@9troisquarts/ant-form';

export default () => (
  <AntForm
    layout="vertical"
    object={{ color: '#FF0000' }}
    schema={[
      {
        name: 'color',
        label: 'Color',
        input: {
          type: 'color'
        }
      }
    ]}
  />
);
```

## Github

```tsx
import React from 'react';
import AntForm from '@9troisquarts/ant-form';

export default () => (
  <AntForm
    layout="vertical"
    object={{ color: '#FF0000' }}
    schema={[
      {
        name: 'color',
        label: 'Color',
        input: {
          type: 'color',
          inputProps: {
            type: 'github',
            colors: ['#FF0000', '#00FF00']
          }
        }
      }
    ]}
  />
);
```

## Block

```tsx
import React from 'react';
import AntForm from '@9troisquarts/ant-form';

export default () => (
  <AntForm
    layout="vertical"
    object={{ color: '#FF0000' }}
    schema={[
      {
        name: 'color',
        label: 'Color',
        input: {
          type: 'color',
          inputProps: {
            type: 'block',
            colors: ['#FF0000', '#00FF00']
          }
        }
      }
    ]}
  />
);
```

<API exports='["default"]' src="../../src/ant-form-color-picker/ant-form-color-picker.tsx"></API>

### AntFormColorPickerOptions

| Name   |     Description      |  Type |  Default |
|----------|-------------|------|---------|
| colors | default colors in picker | ```Array<string>``` | ```(required)``` |
| type | Presentation style of color picker | ```chrome \| github \| block``` | chrome |
| size | Size of color picker |   string | default |
