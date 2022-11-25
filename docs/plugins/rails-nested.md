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
    renderLabel={label => (
      <>
        {label}
        &nbsp;
        >
      </>
    )}
    schema={[
      {
        name: 'people',
        input: {
          type: 'nested',
          inputProps: {
            itemHeader: ({ remove, index }) => (
              <div style={{ marginTop: 10 }}>
                Person {index + 1}
                &nbsp;
                <a onClick={remove}>
                  Supprimer
                </a>
              </div>
            ),
            add: add => (
              <a style={{ display: 'block', marginTop: 10 }} onClick={() => add()}>
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
