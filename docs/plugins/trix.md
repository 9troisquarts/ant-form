---
title: trix
order: 2
toc: menu
---

## Configuration

```javascript
import AntForm, { AntFormTrixEditor } from '@9troisquarts/ant-form';

AntForm.addField('trix', {
  component: AntFormTrixEditor
})
```


## Usage

```tsx
import React from 'react';
import AntForm, { AntFormTrixEditor, useAntForm } from '@9troisquarts/ant-form';

AntForm.addField('trix', {
  component: AntFormTrixEditor
});

const { object, onChange } = useAntForm({ trix: '<h1>TRest</h1>'})

export default () => (
  <AntForm
      layout="vertical"
      object={object}
      onChange={onChange}
      schema={[
        {
          name: 'trix',
          label: 'Description',
          input: {
            type: 'trix',
            inputProps: {
              className: "test"
            }
          },
        }
      ]}
    />
);
```
