"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./ToolBar";

interface TiptapProps {
  onChange: (content: string) => void;
  content: string;
}

const Tiptap: React.FC<TiptapProps> = ({ onChange, content }) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-black items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;