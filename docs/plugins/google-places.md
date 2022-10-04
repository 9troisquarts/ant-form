---
title: Google places
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


## Basic usage

```tsx
import React from 'react';
import AntForm, { AntFormGooglePlaces } from '@9troisquarts/ant-form';

AntForm.addField('places', {
  component: AntFormGooglePlaces,
  apiKey: "api",
  geocoding: true,
  autocompletionRequest: {
    componentRestrictions: { country: ['fr'] }
  },
  selectProps: {
    placeholder: 'Rechercher...',
  }
});

export default () => (
  <AntForm
    object={{}}
    layout="vertical"
    schema={[
      {
        name: 'city',
        label: 'City',
        input: {
          type: 'places',
          inputProps: {
            autocompletionRequest: {
              types: ['street_address']
            },
            editingMode: false,
            renderFormattedAddress: (result) => {
              console.log(result);
              return result.formatted_address;
            }
          }
        }
      }
    ]}
  />
);
```

## City only

```tsx
import React from 'react';
import AntForm, { AntFormGooglePlaces } from '@9troisquarts/ant-form'

AntForm.addField('city', {
  component: AntFormGooglePlaces,
  apiKey: "test",
  geocoding: true,
  autocompletionRequest: {
    componentRestrictions: { country: ['fr'] },
    types: ['(regions)']
  },
  selectProps: {
    placeholder: 'Rechercher...',
  }
});

export default () => (
  <AntForm
    object={{}}
    layout="vertical"
    schema={[
      {
        name: 'city',
        label: 'City',
        input: {
          type: 'city',
          inputProps: {
            editingMode: false,
            renderFormattedAddress: (result) => {
              console.log(result);
              return result.formatted_address;
            }
          }
        }
      }
    ]}
  />
);
```

<API exports='["default"]' src="../../src/ant-form-google-places/ant-form-google-places.tsx"></API>
