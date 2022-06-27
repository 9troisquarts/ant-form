---
title: markdown
order: 2
toc: menu
---

## Configuration

```javascript
import AntForm, { AntFormColorPicker } from '@9troisquarts/ant-form';

AntForm.addField('markdown', {
  component: AntFormMarkdownEditor
})
```


## Usage

```tsx
import React from 'react';
import AntForm, { AntFormMarkdownEditor } from '@9troisquarts/ant-form';

AntForm.addField('markdown', {
  component: AntFormMarkdownEditor
});

export default () => (
  <AntForm
    layout="vertical"
    object={{ color: '#FF0000' }}
    onSubmit={(values) => console.log(values)}
    schema={[
      {
        name: 'markdown',
        label: 'Markdown',
        input: {
          type: 'markdown'
        }
      }
    ]}
  />
);
```
