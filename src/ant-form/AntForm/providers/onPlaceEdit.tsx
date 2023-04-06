import React, { createContext } from 'react';

/*
 * Contexts
 */

type OnPlaceEditContextType = {
  editingField: string | undefined;
  setEditingField: any;
  loading: boolean;
  onPlace: boolean;
  formObject: any;
  onFormSubmit: any;
  submitText: any;
  cancelText: any;
  onFieldChange: () => void;
  onFieldSubmit: () => void;
  errors: any;
  setErrors: any;
};

export const OnPlaceEditContext = createContext<OnPlaceEditContextType>({
  editingField: undefined,
  setEditingField: () => {},
  loading: false,
  onPlace: false,
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

export type OnPlaceEditProviderProps = {
  children?: any;
  editingField?: any;
  loading: boolean;
  onPlace: boolean;
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

export const OnPlaceEditProvider = (props: OnPlaceEditProviderProps) => {
  const {
    children,
    editingField,
    loading,
    onPlace,
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
    <OnPlaceEditContext.Provider
      value={{
        editingField: editingField,
        setEditingField: setEditingField,
        loading: loading,
        onPlace: onPlace,
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
    </OnPlaceEditContext.Provider>
  );
};
