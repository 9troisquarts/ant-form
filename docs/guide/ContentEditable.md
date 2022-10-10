---
title: ContentEditable
order: 6
toc: menu
nav:
  title: Guide
  order: 29
---

## ContentEditable

```tsx
import React from 'react';
import AntForm, { useAntForm } from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
  <AntForm
    object={{
      title: 'Test',
      paragraph: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus purus ligula, tincidunt quis arcu nec, cursus aliquet urna. Aenean lorem nisi, suscipit eu gravida id, vulputate a ex. Praesent euismod est eget diam cursus pellentesque. Cras feugiat euismod quam, eget sodales dui venenatis in. Proin finibus pulvinar consequat. Duis eget tempus urna, eu efficitur purus. Sed porttitor dui et varius interdum."
    }}
    onChange={(value, values) => console.log(values)}
    layout="vertical"
    schema={[
      {
        name: 'title',
        input: {
          type: 'contenteditable',
          inputProps: {
            tagName: 'h1'
          }
        }
      }, 
      {
        name: 'paragraph',
        label: 'Description',
        input: {
          type: 'contenteditable'
        }
      }
    ]}
  />
);
```

<API src="../../src/ant-form/AntForm/fields/ContentEditableInput.tsx"></API>

