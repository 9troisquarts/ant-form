type ExtensionsType = (
  | 'strong'
  | 'code_inline'
  | 'highlight'
  | 'em'
  | 'link'
  | 'placeholder'
  | 'strikethrough'
  | 'underline'
  | 'blockquote'
  | 'bullet_list'
  | 'checkbox_item'
  | 'checkbox_list'
  | 'code_block'
  | 'code_fence'
  | 'embed'
  | 'br'
  | 'heading'
  | 'hr'
  | 'image'
  | 'list_item'
  | 'container_notice'
  | 'ordered_list'
  | 'paragraph'
  | 'table'
  | 'td'
  | 'th'
  | 'tr'
  | 'emoji'
)[];

const disabledExtensions: ExtensionsType = [
  'blockquote',
  'embed',
  'emoji',
  'hr',
  'image',
  'table',
  'strikethrough',
  'code_inline',
  'container_notice',
  'checkbox_item',
  'checkbox_list',
  'code_inline',
];

export default disabledExtensions;
