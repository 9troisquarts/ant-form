import React, { useEffect, useState } from 'react';
import {
  BlockNoteView,
  BlockTypeDropdown,
  BlockTypeDropdownItem,
  CreateLinkButton,
  DefaultSideMenu,
  DragHandleMenu,
  DragHandleMenuItem,
  FormattingToolbarPositioner,
  HyperlinkToolbarPositioner,
  RemoveBlockButton,
  SideMenuPositioner,
  SlashMenuPositioner,
  ToggledStyleButton,
  Toolbar,
  ToolbarButton,
  defaultBlockTypeDropdownItems,
  useBlockNote,
  useEditorContentChange,
  useEditorSelectionChange,
} from '@blocknote/react';
import { Block, BlockNoteEditor } from '@blocknote/core';
import '@blocknote/core/dist/style.css';

export type AntFormMarkdownConfig = {
  placeholder: string;
  dictionary?: {
    [k: string]: string;
  };
};

export type MarkdownInputProps = {
  readOnly: boolean;
};

export type AntFormMarkdownEditorProps = {
  value: string;
  onChange: (value: string | any) => void;
  config?: AntFormMarkdownConfig;
  inputProps?: MarkdownInputProps;
};

const CustomDragHandleMenu = (props: { editor: BlockNoteEditor; block: Block }) => {
  return (
    <DragHandleMenu>
      {/*Default item to remove the block.*/}
      <RemoveBlockButton {...props}>Delete</RemoveBlockButton>
    </DragHandleMenu>
  );
};

const CustomFormattingToolbar = (props: {
  editor: BlockNoteEditor;
  blockTypeDropdownItems: BlockTypeDropdownItem[];
}) => {
  // Tracks whether the text & background are both blue.
  const [isSelected, setIsSelected] = useState<boolean>(
    props.editor.getActiveStyles().textColor === 'blue' &&
      props.editor.getActiveStyles().backgroundColor === 'blue',
  );

  // Updates state on content change.
  useEditorContentChange(props.editor, () => {
    setIsSelected(
      props.editor.getActiveStyles().textColor === 'blue' &&
        props.editor.getActiveStyles().backgroundColor === 'blue',
    );
  });

  // Updates state on selection change.
  useEditorSelectionChange(props.editor, () => {
    setIsSelected(
      props.editor.getActiveStyles().textColor === 'blue' &&
        props.editor.getActiveStyles().backgroundColor === 'blue',
    );
  });

  return (
    <Toolbar>
      <BlockTypeDropdown {...props} items={props.blockTypeDropdownItems} />
      {/*Default button to toggle bold.*/}
      <ToggledStyleButton editor={props.editor} toggledStyle={'bold'} />
      {/*Default button to toggle italic.*/}
      <ToggledStyleButton editor={props.editor} toggledStyle={'italic'} />
      {/*Default button to toggle underline.*/}
      <ToggledStyleButton editor={props.editor} toggledStyle={'strike'} />
      <CreateLinkButton editor={props.editor} />
    </Toolbar>
  );
};

export const AntFormMarkdownEditor: React.FC<AntFormMarkdownEditorProps> = (props) => {
  const { value, onChange, inputProps = {} } = props;

  const { readOnly = false } = inputProps as MarkdownInputProps;

  const [markdown, setMarkdown] = useState<string | undefined>(undefined);

  const editor: BlockNoteEditor = useBlockNote({
    editable: !readOnly,
    domAttributes: {
      editor: {
        class: 'ant-form-markdown-wrapper',
      },
      // Adds a class to all `blockContainer` elements.
      blockContainer: {
        class: 'ant-form-markdown-block',
      },
    },
    // Listens for when the editor's contents change.
    onEditorContentChange: (editor) => {
      // Converts the editor's contents from Block objects to Markdown and
      // saves them.
      const saveBlocksAsMarkdown = async () => {
        const markdown: string = await editor.blocksToMarkdown(editor.topLevelBlocks);
        setMarkdown(markdown);
        onChange(markdown);
      };
      saveBlocksAsMarkdown();
    },
  });

  useEffect(() => {
    if (!!editor && (!markdown || markdown !== value)) {
      // Whenever the current Markdown content changes, converts it to an array
      // of Block objects and replaces the editor's content with them.
      const getBlocks = async () => {
        const blocks: Block[] = await editor.markdownToBlocks(value);
        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      getBlocks();
    }
  }, [value, editor]);

  return (
    <BlockNoteView editor={editor}>
      <HyperlinkToolbarPositioner editor={editor} />
      <SlashMenuPositioner editor={editor} />
      <SideMenuPositioner
        editor={editor}
        sideMenu={(props) => <DefaultSideMenu {...props} dragHandleMenu={CustomDragHandleMenu} />}
      />
      <FormattingToolbarPositioner editor={editor} formattingToolbar={CustomFormattingToolbar} />
    </BlockNoteView>
  );
};

export default AntFormMarkdownEditor;
