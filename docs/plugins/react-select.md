---
title: react-select
order: 2
toc: menu
---

## Basic usage

```tsx
import React from 'react';
import AntForm, { AntFormReactSelect } from '@9troisquarts/ant-form';

AntForm.addField('reactSelect', {
  component: AntFormReactSelect,
  loadingMessage: () => 'Loading...',
  noOptionsMessage: () => 'No options found...',
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const searchPeople = async function() {
  await sleep(1000);
  return [{ name: 'Waybe', firstname: 'Bruce' }, { name: 'Kent', firstname: 'Clark' }, { name: 'Prince', firstname: 'Diana' }];
};

export default () => (
  <AntForm
    layout="vertical"
    object={{ trueIdentity: { firstname: 'Bruce', lastname: 'Wayne' } }}
    onSubmit={(values) => console.log(values)}
    schema={[
      {
        name: 'lastname',
        label: 'Lastname',
        input: {
          type: 'reactSelect',
          loadOptions: searchPeople,
          options: {
            optionLabel: 'name',
            optionValue: 'firstname'
          },
        }
      }
    ]}
  />
);
```

## Creatable

```tsx
import React from 'react';
import AntForm, { AntFormReactSelect } from '@9troisquarts/ant-form';

AntForm.addField('reactSelect', {
  component: AntFormReactSelect,
  loadingMessage: () => 'Loading...',
  noOptionsMessage: () => 'No options found...',
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const searchPeople = async function() {
  await sleep(1000);
  return [{ name: 'Waybe', firstname: 'Bruce' }, { name: 'Kent', firstname: 'Clark' }, { name: 'Prince', firstname: 'Diana' }];
};

export default () => (
  <AntForm
    layout="vertical"
    object={{ trueIdentity: { firstname: 'Bruce', lastname: 'Wayne' } }}
    onSubmit={(values) => console.log(values)}
    schema={[
      {
        name: 'lastname',
        label: 'Lastname',
        input: {
          type: 'reactSelect',
          loadOptions: searchPeople,
          creatable: true,
          options: {
            optionLabel: 'name',
            optionValue: 'firstname'
          },
          inputProps: {
            formatCreateLabel: (inputValue) => `Create ${inputValue}`
          }
        }
      }
    ]}
  />
);
```

<API src="../../src/ant-form-react-select/ant-form-react-select.tsx"></API>
