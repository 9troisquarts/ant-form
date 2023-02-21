import React, { createContext } from 'react';

/*
 * Contexts
 */

type OnPlaceEditContextType = {
  editingField: string | undefined;
  setEditingField: any;
  onplace: boolean;
  formObject: any;
  onFormSubmit: any;
  submitText: any;
  cancelText: any;
  editingFieldLoading: boolean;
  setEditingFieldLoading: any;
  onFieldChange: () => void;
  onFieldSubmit: () => void;
  errors: any;
  setErrors: any;
};

export const OnPlaceEditContext = createContext<OnPlaceEditContextType>({
  editingField: undefined,
  setEditingField: () => {},
  onplace: false,
  formObject: {},
  onFormSubmit: () => {},
  submitText: 'Ok',
  cancelText: 'Cancel',
  editingFieldLoading: false,
  setEditingFieldLoading: () => {},
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
  onplace: boolean;
  formObject?: any;
  onFormSubmit?: any;
  submitText: string;
  cancelText: string;
  setEditingField?: any;
  editingFieldLoading?: any;
  setEditingFieldLoading?: any;
  onFieldChange?: any;
  onFieldSubmit?: any;
  errors?: any;
  setErrors?: any;
};

export const OnPlaceEditProvider = (props: OnPlaceEditProviderProps) => {
  const {
    children,
    editingField,
    onplace,
    formObject,
    onFormSubmit,
    submitText,
    cancelText,
    setEditingField,
    editingFieldLoading,
    setEditingFieldLoading,
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
        onplace: onplace,
        formObject: formObject,
        onFormSubmit: onFormSubmit,
        submitText: submitText,
        cancelText: cancelText,
        editingFieldLoading: editingFieldLoading,
        setEditingFieldLoading: setEditingFieldLoading,
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
