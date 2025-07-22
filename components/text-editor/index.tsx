"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MultiSpan from "./multiSpan";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiPlus } from "react-icons/fi";
import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "@/app/store/store";
import { Button } from "@/components/ui/button";

type DataShape = {
  messageText: string;
  [key: string]: any;
};

interface TextEditorProps {
  data: DataShape;
  setData: React.Dispatch<React.SetStateAction<DataShape>>;
}

const TextEditor: React.FC<TextEditorProps> = ({ data, setData }) => {
  // useSelector with shallowEqual prevents unnecessary re-renders when node hasn't changed
  const node = useSelector((state: RootState) => state.node, shallowEqual);
  console.log(data);
  const [popoverData, setPopoverData] = useState<any>(null);

  // Use useCallback for stable function identity
  const handleUpdate = useCallback(
    ({ editor }: any) => {
      const newContent = editor.getHTML();
      if (newContent !== data.messageText) {
        setData((prev: DataShape) => ({
          ...prev,
          messageText: newContent,
        }));
      }
    },
    [setData, data.messageText]
  );

  const editor = useEditor({
    extensions: [StarterKit, MultiSpan],
    content: data.messageText,
    onUpdate: handleUpdate,
    immediatelyRender: false,
  });

  // Memoize insertSpan and prevent recreation on every render
  const insertSpan = useCallback(
    (key: string, value: string) => {
      if (!editor) return;
      editor
        .chain()
        .focus()
        .insertContent({
          type: "multiSpan",
          attrs: { key, value },
        })
        .run();
    },
    [editor]
  );

  // Only update editor when data.messageText changes from outside
  useEffect(() => {
    if (editor && data.messageText !== editor.getHTML()) {
      editor.commands.setContent(data.messageText ?? "<p></p>", {
        emitUpdate: false,
      });
    }
    // Only depends on data.messageText and editor!
  }, [data.messageText, editor]);

  // Memoized click handler for PopoverTrigger (optional, but stable fn)
  const handlePopoverTrigger = useCallback(() => {
    const nodeIndex = node.nodes.findIndex(
      (n: any) => n.id === node.editNode.id
    );
    const prevNode = node.nodes[nodeIndex - 1] as any;
    setPopoverData(prevNode);
  }, [node]);

  // Memoized Popover content rendering for stability
  const renderPopoverContent = useCallback(
    () => (
      <div className="flex flex-col gap-2">
        {popoverData?.data?.selectedResponse?.data &&
          Object.entries(popoverData?.data?.selectedResponse?.data)?.map(
            ([key, value]) => (
              <div key={key}>
                <Button
                  onClick={() => insertSpan(key, String(value))}
                  variant="outline"
                  className="flex items-center gap-2 p-0 px-1 m-0 h-auto"
                >
                  <span>{key}</span>
                  <span className="text-xs text-gray-500">{String(value)}</span>
                </Button>
              </div>
            )
          )}
      </div>
    ),
    [popoverData, insertSpan]
  );

  return (
    <div className="w-full flex flex-col gap-2 items-end">
      <EditorContent className="w-full border rounded" editor={editor} />
      <Popover>
        <PopoverTrigger onClick={handlePopoverTrigger}>
          <FiPlus />
        </PopoverTrigger>
        <PopoverContent align="end" className="text-xs flex flex-col gap-2">
          <div>{popoverData?.data?.triggerEvent}</div>
          {renderPopoverContent()}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default React.memo(TextEditor);
