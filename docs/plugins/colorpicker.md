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

## Basic usage

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
    onSubmit={(values) => console.log(values)}
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

<API exports='["default"]' src="../../src/ant-form-color-picker/ant-form-color-picker.tsx"></API>
