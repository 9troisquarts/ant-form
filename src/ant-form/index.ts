// @ts-nocheck
import AForm, { configure, addInputType } from './AntForm';
export { AntForm as AntForm } from './AntForm';
export type { AntFormProps } from './AntForm';
export type { AntSchema } from './AntForm/types';
export { useAntForm } from './AntForm/hooks/useAntForm';
import InPlaceForm from './InPlaceForm';

const AntForm = AForm;
AntForm.configure = configure;
AntForm.addField = addInputType;
AntForm.InPlace = InPlaceForm;

export default AntForm;
