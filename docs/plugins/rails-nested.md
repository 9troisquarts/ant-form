---
title: Rails nested
order: 2
toc: menu
---

## Configuration

```javascript
import AntForm, { AntFormRailsNested } from '@9troisquarts/ant-form';

AntForm.addField('nested', {
  component: AntFormRailsNested
});
```

## Usage

```tsx
import React from 'react';
import AntForm, { AntFormRailsNested } from '@9troisquarts/ant-form';

AntForm.addField('nested', {
  component: AntFormRailsNested
});

export default () => (
  <AntForm
    layout="vertical"
    object={{ people: [{firstName: 'Bruce' }] }}
    onSubmit={(values) => console.log(values)}
    schema={[
      {
        name: 'people',
        input: {
          type: 'nested',
          inputProps: {
            itemHeader: ({ remove, index }) => (
              <div style={{┬ámarginTop: 10 }}>
                Person {index + 1}
                &nbsp;
                <a onClick={remove}>
                  Supprimer
                </a>
              </div>
            ),
            add: add => (
              <a style={{┬ádisplay: 'block', marginTop: 10 }} onClick={() => add()}>
                Add a person
              </a>
            ),
          },
          schema: (
            person,
            index: number,
          ) => {
            return [
              {
                name: 'firstName',
                label: 'First name',
                readOnly: true,
                required: true,
                input: {
                  type: 'string',
                  inputProps: {
                    readOnly: true,
                  },
                }
              },
            ];
          },
        },
      }
    ]}
  />
);
```
