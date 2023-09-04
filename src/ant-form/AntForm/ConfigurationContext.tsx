// @ts-nocheck
import { InfoCircleOutlined } from '@ant-design/icons';
import React, { createContext } from 'react';
import { Configuration } from './types';

const ConfigurationContext = createContext<Configuration>({
  submitText: 'Save',
  layout: 'horizontal',
  language: 'fr',
  tooltipIcon: <InfoCircleOutlined />,
  dateFormat: 'L',
  file: {
    addButtonText: 'Add document',
    emptyText: 'No file',
  },
});

export default ConfigurationContext;
