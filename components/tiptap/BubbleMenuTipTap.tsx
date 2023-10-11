import HandleImage from '@/components/tiptap/HandleImage';
import HandleLinks from '@/components/tiptap/handleLinks';
import HandleProgrammingLanguage from '@/components/tiptap/handleProgrammingLanguage';
import { Toggle } from '@/components/ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BubbleMenu, Editor } from '@tiptap/react';
import {
  Bold,
  CodeIcon,
  Edit,
  HighlighterIcon,
  Italic,
  LanguagesIcon,
  Link,
  Strikethrough,
} from 'lucide-react';
import React, { useState } from 'react';

const isImageSelection = (editor: Editor | any) => {
  return (
    editor?.state.selection.node &&
    editor.state.selection.node.type &&
    editor.state.selection.node.type.name === 'image'
  );
};

const BubbleMenuTipTap = ({ editor }: { editor: Editor | null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);

  return (
    <>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className={'bg-gray-200 dark:bg-gray-700 flex gap-2 p-2 rounded-md'}
        >
          <HandleLinks editor={editor} isOpen={isOpen} setIsOpen={setIsOpen} />
          <HandleProgrammingLanguage
            editor={editor}
            isOpen={isLanguageOpen}
            setIsOpen={setIsLanguageOpen}
          />
          <HandleImage
            editor={editor}
            isOpen={isModalImageOpen}
            setIsOpen={setIsModalImageOpen}
            isEdit={true}
          />

          {!isImageSelection(editor) ? (
            <div className={'flex gap-2'}>
              <Toggle
                onClick={() => editor.chain().focus().toggleBold().run()}
                variant={'outline'}
                aria-label="Toggle bold"
                aria-pressed={`${editor.isActive('bold') ? 'true' : 'false'}`}
                data-state={`${editor.isActive('bold') ? 'on' : 'off'}`}
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                onClick={() => editor.chain().focus().toggleItalic().run()}
                variant={'outline'}
                aria-label="Toggle italic"
                aria-pressed={`${editor.isActive('italic') ? 'true' : 'false'}`}
                data-state={`${editor.isActive('italic') ? 'on' : 'off'}`}
              >
                <Italic className="h-4 w-4" />
              </Toggle>

              <Toggle
                onClick={() => editor.chain().focus().toggleStrike().run()}
                variant={'outline'}
                aria-label="Toggle strke"
                aria-pressed={`${editor.isActive('strike') ? 'true' : 'false'}`}
                data-state={`${editor.isActive('strike') ? 'on' : 'off'}`}
              >
                <Strikethrough className="h-4 w-4" />
              </Toggle>
              <Toggle
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                variant={'outline'}
                aria-label="Toggle Code block"
                aria-pressed={`${
                  editor.isActive('codeBlock') ? 'true' : 'false'
                }`}
                data-state={`${editor.isActive('codeBlock') ? 'on' : 'off'}`}
              >
                <CodeIcon className="h-4 w-4" />
              </Toggle>
              {editor.isActive('codeBlock') ? (
                <Toggle
                  onClick={() => setIsLanguageOpen(true)}
                  variant={'outline'}
                  aria-label="Change languages"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <LanguagesIcon className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Change Programming language</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Toggle>
              ) : (
                ''
              )}
              <Toggle
                onClick={() => {
                  if (editor.isActive('link')) {
                    editor
                      .chain()
                      .focus()
                      .extendMarkRange('link')
                      .unsetLink()
                      .run();
                  } else {
                    setIsOpen(true);
                  }
                }}
                variant={'outline'}
                aria-label="Toggle strke"
                aria-pressed={`${editor.isActive('link') ? 'true' : 'false'}`}
                data-state={`${editor.isActive('link') ? 'on' : 'off'}`}
              >
                <Link className="h-4 w-4" />
              </Toggle>
              <Toggle
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange('link')
                    .toggleHighlight()
                    .run();
                }}
                aria-pressed={`${
                  editor.isActive('highlight') ? 'true' : 'false'
                }`}
                data-state={`${editor.isActive('highlight') ? 'on' : 'off'}`}
                variant={'outline'}
                aria-label="Highlight"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HighlighterIcon className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Highlight</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Toggle>
            </div>
          ) : (
            <div className={'pr-2.5'}>
              <Edit
                className={
                  'cursor-pointer transition-all duration-300 hover:scale-105 transform-gpu'
                }
                onClick={() => {
                  setIsModalImageOpen(true);
                }}
              />
            </div>
          )}
        </BubbleMenu>
      )}
    </>
  );
};

export default BubbleMenuTipTap;
