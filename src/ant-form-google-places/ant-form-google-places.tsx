import React, { useState, useEffect } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

export type GooglePlacesFieldConfig = {
  apiKey: string;
  selectProps?: any;
};

type ValueType = {
  city?: string;
  lat?: number;
  lng?: number;
  formattedAddress?: string;
};

export type AntFormGooglePlacesProps = {
  value?: ValueType;
  onChange: (value: string | any) => void;
  config?: GooglePlacesFieldConfig;
  renderFormattedAddress?: (result: any) => string;
  editingMode?: boolean;
}

export const AntFormGooglePlaces: React.FC<AntFormGooglePlacesProps> = props => {
  const {
    value,
    config: {
      selectProps = {},
      apiKey,
      ...config
    } = {},
    renderFormattedAddress,
    onChange,
  } = props;

  const [placesValue, setPlacesValue] = useState<any>(value || undefined);

  useEffect(() => {
    setPlacesValue(value);
  }, [value]);

  if(!config || !apiKey) return (<div>API KEY must be provided to config</div>);
  const handleChange = ({ label, value }: { value: any, label: string }) => {
    if (value) {
      geocodeByPlaceId(value.place_id).then(results => {
        if(results.length > 0) {
          const result = results[0];
          const nextValue = {
            formattedAddress: renderFormattedAddress ? renderFormattedAddress(result) : result.formatted_address,
            city: result.address_components.find(a => a.types.includes('locality'))?.long_name,
            lat: result.geometry?.location.lat(),
            lng: result.geometry?.location.lng(),
            administrativeAreaLevels: result.address_components.filter(a => a.types.some(e => e.includes('administrative_area_level')))
          };
          onChange(nextValue);
          setPlacesValue(nextValue);
        }
      }).catch(error => console.error(error));
    }
  }

  let v = undefined;
  if (placesValue && typeof placesValue === "string") {
    v = { value: placesValue, label: placesValue };
  } else if (!!placesValue?.formattedAddress) {
    v = { value: placesValue.formattedAddress, label: placesValue.formattedAddress }
  }

  return (
    <GooglePlacesAutocomplete
      {...config || {}}
      key={v?.value}
      selectProps={{
        onChange: handleChange,
        value: v,
        ...(selectProps || {}),
      }}
      apiKey={apiKey}
    />
  )
}


export default AntFormGooglePlaces
