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
import AntForm, { AntFormTrixEditor } from '@9troisquarts/ant-form';

AntForm.addField('trix', {
  component: AntFormTrixEditor
});

export default () => (
  <AntForm
      layout="vertical"
      object={{ trix: '<div>2 videos on Adobe Media Encoder.</div>' }}
      onSubmit={(values) => console.log(values)}
      schema={[
        {
          name: 'trix',
          label: 'Description',
          input: {
            type: 'trix',
          }
        }
      ]}
    />
);
```
