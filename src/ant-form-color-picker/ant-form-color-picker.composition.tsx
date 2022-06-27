//@ts-nocheck
import React from 'react';
import { AntFormColorPicker } from './ant-form-color-picker';
import AntForm from '@9troisquarts/ant-form.ant-form';

AntForm.addField('color', {
  component: AntFormColorPicker
});

export const BasicAntFormColorPicker = () => (
  <div style={{ padding: 16 }}>
    <AntForm
      layout="vertical"
      object={{ color: '#efefef' }}
      onSubmit={(values) => console.log(values)}
      schema={[
        {
          name: 'color',
          label: 'Color',
          input: {
            type: 'color',
            inputProps: {
              type: 'chrome',
              size: "default"
            },
          }
        }
      ]}
    />
  </div>

);
