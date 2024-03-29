---
title: Basic
order: 2
toc: menu
---

## Demo

```tsx
import AntForm from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';
import React from 'react';

AntForm.configure({
  language: 'fr',
  file: {
    addButtonText: 'Ajouter un document',
    emptyText: 'Aucun fichier',
  },
});

export default () => {
  return (
    <div>
      <AntForm
        object={{
          date: '2022-01-01',
          select: 'one',
          id: 2,
          files: [
            {
              id: 1,
              name: 'toto.png',
              canDestroy: true,
            },
            {
              id: 2,
              name: 'titi.png',
              canDestroy: false,
            },
          ],
        }}
        errors={{ firstname: ['is required'] }}
        onSubmit={(values) => console.log(values)}
        onChange={(value, values) => console.log(value, values)}
        schema={[
          <h2 key="paragraph" style={{ marginBottom: 24 }}>
            React Component
          </h2>,
          [
            {
              name: 'id',
              hidden: true,
            },
            {
              name: 'firstname',
              label: 'Firstname',
              tooltip: 'Firstname',
              input: {
                type: 'string',
              },
              colProps: {
                xs: 24,
                md: 12,
                lg: 12,
              },
            },
            {
              name: 'lastname',
              label: 'Lastname',
              input: {
                type: 'string',
              },
              colProps: {
                xs: 24,
                md: 12,
                lg: 12,
              },
            },
          ],
          [
            {
              label: 'Proxy',
              name: 'task',
              proxy: { name: 'taskId' },
              input: {
                type: 'string',
              },
              colProps: {
                xs: 24,
                md: 12,
                lg: 12,
              },
            },
            {
              label: 'Proxy',
              name: 'tasks',
              proxy: { name: 'taskIds' },
              input: {
                type: 'select',
                options: [
                  {
                    label: 'test',
                    value: '1',
                  },
                  {
                    label: 'test 2',
                    value: '2',
                  },
                ],
                inputProps: {
                  mode: 'multiple',
                },
              },
              colProps: {
                xs: 24,
                md: 12,
                lg: 12,
              },
            },
          ],
          [
            {
              name: 'select',
              label: 'Select',
              input: {
                type: 'select',
                options: [
                  {
                    label: 'Option 1',
                    value: 'one',
                  },
                  {
                    label: 'Option 2',
                    value: 'two',
                  },
                  {
                    label: 'Option 3',
                    value: 'three',
                  },
                ],
              },
              colProps: {
                xs: 24,
                md: 12,
              },
            },
            {
              name: 'select2',
              label: 'Select',
              input: {
                type: 'select',
                options: [
                  {
                    label: 'Option 1',
                    value: 'one',
                  },
                  {
                    label: 'Option 2',
                    value: 'two',
                  },
                  {
                    label: 'Option 3',
                    value: 'three',
                  },
                ],
                inputProps: {
                  showSearch: true,
                },
              },
              colProps: {
                xs: 24,
                md: 12,
              },
            },
            {
              name: 'disabledselect',
              label: 'Disabled Select',
              input: {
                type: 'select',
                options: [
                  {
                    label: 'Option 1',
                    value: 'one',
                  },
                ],
                inputProps: {
                  disabled: true,
                },
              },
              colProps: {
                xs: 24,
                md: 12,
              },
            },
            {
              name: 'optionGrp',
              label: 'Select with group',
              input: {
                type: 'select',
                options: [
                  {
                    label: 'Jedi',
                    options: [
                      {
                        label: 'Luke Skywalker',
                        value: 'luke',
                      },
                      {
                        label: 'Obi-wan Kenobi',
                        value: 'obi',
                      },
                    ],
                  },
                  {
                    label: 'Droïde',
                    options: [
                      {
                        label: 'R2D2',
                        value: 'r2d2',
                      },
                    ],
                  },
                ],
              },
              colProps: {
                xs: 24,
                md: 12,
              },
            },
            [
              {
                name: 'padawan',
                label: 'Padawan if obi',
                condition: (obj) => obj.optionGrp === 'obi',
                input: {
                  type: 'select',
                  options: [
                    { value: 'luke', label: 'Luke Skywalker' },
                    { value: 'anakin', label: 'Anakin Skywalker' },
                  ],
                },
                colProps: {
                  xs: 24,
                  md: 12,
                },
              },
            ],
          ],
          {
            name: 'checkbox',
            input: {
              type: 'checkbox',
              text: 'Checkbox',
            },
          },
          {
            name: 'checkboxes',
            label: 'Checkboxes',
            input: {
              type: 'checkboxes',
              options: [
                { label: 'Checkbox 1', value: '1' },
                { label: 'Checkbox 2', value: '2' },
              ],
            },
          },
          {
            name: 'radios',
            label: 'Radio',
            input: {
              type: 'radio',
              options: [
                { label: 'Checkbox 1', value: '1' },
                { label: 'Checkbox 2', value: '2' },
              ],
            },
          },
          {
            name: 'switch',
            label: 'Switch',
            input: {
              type: 'switch',
            },
          },
          {
            name: 'Boolean',
            input: {
              type: 'boolean',
              inputProps: {
                text: 'Publié',
              },
            },
          },
          [
            {
              name: 'date',
              label: 'Datepicker',
              input: {
                type: 'date',
                inputProps: {
                  format: 'L',
                },
              },
              colProps: {
                xs: 12,
              },
            },
            {
              name: 'rate',
              label: 'Rate',
              input: {
                type: 'rate',
                inputProps: {
                  allowHalf: true,
                  allowClear: true,
                  count: 6,
                },
              },
              colProps: {
                xs: 12,
              },
            },
          ],
          {
            name: 'textarea',
            label: 'Textarea with Help',
            help: 'this is a help for a field',
            input: {
              type: 'text',
            },
          },
          [
            {
              name: 'slider',
              label: 'Slider',
              input: {
                type: 'slider',
                inputProps: {
                  defaultValue: 30,
                },
              },
              colProps: {
                xs: 24,
                md: 12,
              },
            },
            {
              name: 'rangeslider',
              label: 'Range Slider',
              input: {
                type: 'slider',
                inputProps: {
                  range: true,
                  defaultValue: [20, 50],
                },
              },
              colProps: {
                xs: 24,
                md: 12,
              },
            },
          ],
          {
            name: 'password',
            label: 'password',
            input: {
              type: 'password',
            },
          },
          {
            name: 'logo',
            label: 'File',
            input: {
              type: 'file',
              inputProps: {
                multiple: false,
                addButtonProps: {
                  children: 'Choisir un fichier',
                },
              },
            },
          },
          {
            name: 'files',
            label: 'File',
            input: {
              type: 'file',
              inputProps: {
                multiple: true,
              },
            },
          },
        ]}
      />
    </div>
  );
};
```

## Custom label rendering

```tsx
import React from 'react';
import { Tooltip, Space, Alert } from 'antd';
import AntForm from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
 <>
    <AntForm
      object={{ date: '2022-01-01' }}
      onSubmit={(values) => console.log(values)}
      renderLabel={(label, { tooltip }) => (
        <Space>
          {label}
          {tooltip && (
            <Tooltip title={tooltip.title}>
              {tooltip.icon}
            </Tooltip>
          )}
          >
        </Space>
      )}
      schema={[
        {
          name: 'firstname',
          label: 'Firstname',
          required: true,
          tooltip: 'Info bulle',
          help: 'Aide à la saisie',
          input: {
            type: 'string',
          },
          colProps: {
            xs: 24,
            md: 12,
            lg: 12
          }
        },
        {
          name: 'number',
          label: 'Number',
          input: {
            type: 'number',
          }
        },
      ]}
    />
    <Alert
      style={{ marginTop: 16 }}
      type="warning"
      message={"Warning"}
      description="Tooltip must be added in renderLabel props to be displayed"
    />
 </>
)
```

## Sub-field

```tsx
import AntForm from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';
import React from 'react';

export default () => (
  <>
    <AntForm
      object={{ array: [undefined, { title: 'test' }] }}
      onSubmit={(values) => console.log(values)}
      onChange={(value, values) => console.log(values)}
      layout="vertical"
      schema={[
        [
          {
            name: 'user.lastname',
            label: 'Nom',
            required: true,
            input: {
              type: 'string',
            },
            colProps: {
              xs: 24,
              md: 12,
              lg: 12,
            },
          },
          {
            name: 'user.firstname',
            label: 'Prénom',
            required: true,
            input: {
              type: 'string',
            },
            colProps: {
              xs: 24,
              md: 12,
              lg: 12,
            },
          },
        ],
        {
          name: 'array[1].title',
          label: 'Titre',
          input: {
            type: 'string',
          },
        },
      ]}
    />
  </>
);
```

## Champs conditionnés

`hidden` : Le champ est caché, mais sa valeur est définit dans l'objet de retour

Exemple:

```ts|pure
{
  name: 'id',
  hidden: true
}
```

`condition` : Le champ est caché ET sa valeur n'est pas définit dans l'objet de retour

Exemple:

```ts|pure
{
  name: 'padawan',
  label: 'Padawan',
  condition: (obj) => obj.optionGrp === "obi",
}
```

<API src="../../src/ant-form/AntForm/index.tsx"></API>

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
