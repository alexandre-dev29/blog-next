import { LanguageList } from '@/components/tiptap/LanguageList';
import Tippy from '@tippyjs/react';
import { Editor } from '@tiptap/react';
import React from 'react';

const HandleLanguages = ({
  editor,
  setIsOpen,
  isOpen,
}: {
  editor: Editor | null;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  return (
    <>
      <Tippy
        interactive={true}
        interactiveBorder={20}
        onClickOutside={() => setIsOpen(false)}
        visible={isOpen}
        delay={100}
        className={
          'bg-white dark:bg-gray-900 border-2 p-4 shadow-sm  w-[350px] mb-4'
        }
        content={
          <LanguageList
            onSelecionChange={(language) => {
              if (editor) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange('code')
                  .toggleCodeBlock({ language: language })
                  .run();
              }
            }}
          />
        }
      >
        <p></p>
      </Tippy>
    </>
  );
};

export default HandleLanguages;
