import React, { createContext } from 'react';

/*
 * Contexts
 */

type OnPlaceEditContextType = {
  editingField: string | undefined;
  setEditingField: any;
  loading: boolean;
  onplace: boolean;
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
  onplace: false,
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
  onplace: boolean;
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
    onplace,
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
        onplace: onplace,
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
