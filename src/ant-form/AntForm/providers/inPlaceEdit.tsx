import React, { createContext } from 'react';

/*
 * Contexts
 */

type InPlaceEditContextType = {
  editingField: string | undefined;
  setEditingField: any;
  loading: boolean;
  inPlace: boolean;
  formObject: any;
  onFormSubmit: any;
  submitText: any;
  cancelText: any;
  onFieldChange: () => void;
  onFieldSubmit: () => void;
  errors: any;
  setErrors: any;
};

export const InPlaceEditContext = createContext<InPlaceEditContextType>({
  editingField: undefined,
  setEditingField: () => {},
  loading: false,
  inPlace: false,
  formObject: {},
  onFormSubmit: () => {},
  submitText: 'Ok',
  cancelText: 'Cancel',
  onFieldChange: () => {},
  onFieldSubmit: () => {},
  errors: {},
  setErrors: () => {},
});

/*
 * Providers
 */

export type InPlaceEditProviderProps = {
  children?: any;
  editingField?: any;
  loading: boolean;
  inPlace: boolean;
  formObject?: any;
  onFormSubmit?: any;
  submitText: string;
  cancelText: string;
  setEditingField?: any;
  onFieldChange?: any;
  onFieldSubmit?: any;
  errors?: any;
  setErrors?: any;
};

export const InPlaceEditProvider = (props: InPlaceEditProviderProps) => {
  const {
    children,
    editingField,
    loading,
    inPlace,
    formObject,
    onFormSubmit,
    submitText,
    cancelText,
    setEditingField,
    onFieldChange,
    onFieldSubmit,
    errors,
    setErrors,
  } = props;

  /*
   * Render
   */

  return (
    <InPlaceEditContext.Provider
      value={{
        editingField: editingField,
        setEditingField: setEditingField,
        loading: loading,
        inPlace: inPlace,
        formObject: formObject,
        onFormSubmit: onFormSubmit,
        submitText: submitText,
        cancelText: cancelText,
        onFieldChange: onFieldChange,
        onFieldSubmit: onFieldSubmit,
        errors: errors,
        setErrors: setErrors,
      }}
    >
      {children}
    </InPlaceEditContext.Provider>
  );
};
