---
title: markdown
order: 9
toc: menu
---

## Configuration

## Usage

```tsx
import React from 'react';
import AntForm, { AntFormMarkdownEditor } from '@9troisquarts/ant-form';

AntForm.addField('markdown', {
  component: AntFormMarkdownEditor,
});

export default () => (
  <AntForm
    layout="vertical"
    object={{ markdown: '**dzadijaz**' }}
    onSubmit={(values) => console.log(values)}
    schema={[
      {
        name: 'markdown',
        label: 'Markdown',
        input: {
          type: 'markdown',
        },
      },
    ]}
  />
);
```

```tsx
import React from 'react';
import AntForm, { AntFormRichMarkdownEditor } from '@9troisquarts/ant-form';

AntForm.addField('markdown', {
  component: AntFormRichMarkdownEditor,
});

export default () => (
  <AntForm
    layout="vertical"
    object={{ markdown: '**dzadijaz**' }}
    onSubmit={(values) => console.log(values)}
    schema={[
      {
        name: 'markdown',
        label: 'Markdown',
        input: {
          type: 'markdown',
        },
      },
    ]}
  />
);
```
