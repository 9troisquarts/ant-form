---
title: colorpicker
order: 2
toc: menu
---

## Configuration

```javascript
import React from 'react';
import AntForm, { AntFormColorPicker } from '@9troisquarts/ant-form';

AntForm.addField('color', {
  component: AntFormColorPicker
});
```

## Chrome (default)

```tsx
import React from 'react';
import AntForm, { AntFormColorPicker } from '@9troisquarts/ant-form';

AntForm.addField('color', {
  component: AntFormColorPicker
});

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
import AntForm, { AntFormColorPicker } from '@9troisquarts/ant-form';

AntForm.addField('color', {
  component: AntFormColorPicker
});

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
import AntForm, { AntFormColorPicker } from '@9troisquarts/ant-form';

AntForm.addField('color', {
  component: AntFormColorPicker
});

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
