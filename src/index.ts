import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

dayjs().format('L LT');

import AntForm from './ant-form';
export type { AntSchema as AntSchema } from './ant-form';
export { AntFormColorPicker as AntFormColorPicker } from './ant-form-color-picker';
export { AntFormGooglePlaces as AntFormGooglePlaces } from './ant-form-google-places/index';
export { AntFormMarkdownEditor as AntFormMarkdownEditor } from './ant-form-markdown-editor/index';
export { AntFormRailsNested as AntFormRailsNested } from './ant-form-rails-nested/index';
export { default as AntFormReactSelect } from './ant-form-react-select';
export { AntFormRichMarkdownEditor as AntFormRichMarkdownEditor } from './ant-form-rich-markdown-editor/index';
export { default as AntFormTrixEditor } from './ant-form-trix-editor/index';
export { useAntForm as useAntForm } from './ant-form/index';
export default AntForm;
