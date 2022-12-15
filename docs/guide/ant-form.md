---
title: Basic
order: 2
toc: menu
---

## Demo

```tsx
import React from 'react';
import AntForm from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

AntForm.configure({
  language: 'fr'
});

export default () => {
  return (
    <div>
      <AntForm
        object={{ date: '2022-01-01' }}
        errors={{ firstname: ['is required'] }}
        onSubmit={(values) => console.log(values)}
        schema={[
          <h2 key="paragraph" style={{ marginBottom: 24 }}>
            React Component
          </h2>,
          [
            {
              name: 'firstname',
              label: 'Firstname',
              input: {
                type: 'string',
              },
              colProps: {
                xs: 24,
                md: 12,
                lg: 12
              }
            }, {
              name: 'lastname',
              label: 'Lastname',
              input: {
                type: 'string'
              },
              colProps: {
                xs: 24,
                md: 12,
                lg: 12
              }
            }
          ],
          [
            {
              name: 'select',
              label: 'Select',
              input: {
                type: 'select',
                options: [{
                  label: 'Option 1',
                  value: 'one'
                }, {
                  label: 'Option 2',
                  value: 'two'
                }, {
                  label: 'Option 3',
                  value: 'three'
                }]
              },
              colProps: {
                xs: 24,
                md: 12,
              }
            },
            {
              name: 'select2',
              label: 'Select',
              input: {
                type: 'select',
                options: [{
                  label: 'Option 1',
                  value: 'one'
                }, {
                  label: 'Option 2',
                  value: 'two'
                }, {
                  label: 'Option 3',
                  value: 'three'
                }],
                inputProps: {
                  showSearch: true,
                }
              },
              colProps: {
                xs: 24,
                md: 12,
              }
            },
            {
              name: 'disabledselect',
              label: 'Disabled Select',
              input: {
                type: 'select',
                options: [{
                  label: 'Option 1',
                  value: 'one'
                }],
                inputProps: {
                  disabled: true
                }
              },
              colProps: {
                xs: 24,
                md: 12,
              }
            },
            {
              name: 'optionGrp',
              label: 'Select with group',
              input: {
                type: 'select',
                options: [{
                  label: 'Jedi', 
                  options: [
                    {
                      label: 'Luke Skywalker',
                      value: 'luke'
                    },
                    {
                      label: 'Obi-wan Kenobi',
                      value: 'luke'
                    }
                  ]
                },{
                  label: 'Droïde', 
                  options: [
                    {
                      label: 'R2D2',
                      value: 'r2d2'
                    }
                  ]
                }]
              },
              colProps: {
                xs: 24,
                md: 12,
              }
            }
          ],
          {
            name: 'checkbox',
            input: {
              type: 'checkbox',
              text: 'Checkbox'
            }
          },
          {
            name: 'checkboxes',
            label: 'Checkboxes',
            input: {
              type: 'checkboxes',
              options: [{ label: 'Checkbox 1', value: '1' }, { label: 'Checkbox 2', value: '2' }]
            }
          },
          {
            name: 'radios',
            label: 'Radio',
            input: {
              type: 'radio',
              options: [{ label: 'Checkbox 1', value: '1' }, { label: 'Checkbox 2', value: '2' }]
            }
          },
          {
            name: 'switch',
            label: 'Switch',
            input: {
              type: 'switch',
            }
          },
          {
            name: 'Boolean', 
            input: {
              type: 'boolean',
              inputProps: {
                text: 'Publié'
              }
            }
          },
          [{
            name: 'date',
            label: 'Datepicker',
            input: {
              type: 'date',
              inputProps: {
                format: 'L'
              }
            },
            colProps: {
              xs: 12,
            }
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
              }
            },
            colProps: {
              xs: 12,
            }
          }],
          {
            name: 'textarea',
            label: 'Textarea with Help',
            input: {
              type: 'text'
            }
          },
          [
            {
              name: 'slider',
              label: 'Slider',
              input: {
                type: 'slider',
                inputProps: {
                  defaultValue: 30
                }
              },
              colProps: {
                xs: 24,
                md: 12
              }
            },
            {
              name: 'rangeslider',
              label: 'Range Slider',
              input: {
                type: 'slider',
                inputProps: {
                  range: true,
                  defaultValue: [20, 50]
                }
              },
              colProps: {
                xs: 24,
                md: 12
              }
            }
          ],
          {
            name: 'password',
            label: 'password',
            input: {
              type: 'password',
            }
          },
          {
            name: 'logo',
            input: {
              type: 'upload',
              inputProps: {
                placeholder: "Choisir un fichier",
              },
            },
          }
        ]}
      />
    </div>
    );
  }
```

## Custom label rendering

```tsx
import React from 'react';
import AntForm from '@9troisquarts/ant-form';
import 'antd/dist/antd.css';

export default () => (
  <AntForm
    object={{ date: '2022-01-01' }}
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
        name: 'firstname',
        label: 'Firstname',
        required: true,
        input: {
          type: 'string',
        },
        colProps: {
          xs: 24,
          md: 12,
          lg: 12
        }
      }
    ]}
  />
)
```

<API src="../../src/ant-form/AntForm/index.tsx"></API>

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
