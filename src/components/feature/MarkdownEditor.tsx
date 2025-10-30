"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Link from "@tiptap/extension-link";
import { Heading } from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import {
   Bold as BoldIcon,
   Italic as ItalicIcon,
   Link as LinkIcon,
   List,
   ListOrdered,
} from "lucide-react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
   content: string;
   onChange: (content: string) => void;
   variant?: "short" | "long";
   useBullet?: boolean;
}

export const MarkdownEditor = ({
   content,
   onChange,
   variant = "short",
   useBullet = true,
}: MarkdownEditorProps) => {
   const [isFocused, setIsFocused] = useState(false);

   const editor = useEditor({
      immediatelyRender: false,
      extensions: [
         Document,
         Paragraph,
         Text,
         History,
         Bold,
         Italic,
         Heading.configure({
            levels: [1, 2],
         }),
         Link.configure({
            openOnClick: false,
            autolink: true,
         }),
         ListItem,
         BulletList,
         OrderedList,
      ],
      content: content,
      onUpdate: ({ editor }) => {
         onChange(editor.getHTML());
      },
      onFocus: () => setIsFocused(true),
      onBlur: () => {
         // Use a timeout to allow toolbar buttons to be clicked
         setTimeout(() => {
            setIsFocused(false);
         }, 150);
      },
      editorProps: {
         attributes: {
            class: cn(
               "w-full rounded-md border border-input bg-transparent px-3 focus-visible:ring-blue-300 focus:border-blue-300 ring-blue-300 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
               variant === "short" ? "h-9 py-2" : "min-h-[80px] py-2"
            ),
         },
      },
   });

   const setLink = useCallback(() => {
      if (!editor) return;
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      if (url === null) {
         return;
      }
      if (url === "") {
         editor.chain().focus().extendMarkRange("link").unsetLink().run();
         return;
      }
      editor
         .chain()
         .focus()
         .extendMarkRange("link")
         .setLink({ href: url })
         .run();
   }, [editor]);

   if (!editor) {
      return null;
   }

   return (
      <div className="relative">
         <EditorContent editor={editor} />
         {isFocused && (
            <div className="bg-white border rounded-md shadow-xs flex overflow-hidden mt-2">
               <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={`p-2 hover:bg-gray-100 ${
                     editor.isActive("bold") ? "bg-gray-200" : ""
                  }`}
               >
                  <BoldIcon size={16} />
               </button>
               <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={`p-2 hover:bg-gray-100 ${
                     editor.isActive("italic") ? "bg-gray-200" : ""
                  }`}
               >
                  <ItalicIcon size={16} />
               </button>
               <button
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={setLink}
                  className={`p-2 hover:bg-gray-100 ${
                     editor.isActive("link") ? "bg-gray-200" : ""
                  }`}
               >
                  <LinkIcon size={16} />
               </button>
               {variant === "long" && useBullet && (
                  <>
                     <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                           editor.chain().focus().toggleBulletList().run()
                        }
                        className={`p-2 hover:bg-gray-100 ${
                           editor.isActive("bulletList") ? "bg-gray-200" : ""
                        }`}
                     >
                        <List size={16} />
                     </button>
                     <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() =>
                           editor.chain().focus().toggleOrderedList().run()
                        }
                        className={`p-2 hover:bg-gray-100 ${
                           editor.isActive("orderedList") ? "bg-gray-200" : ""
                        }`}
                     >
                        <ListOrdered size={16} />
                     </button>
                  </>
               )}
            </div>
         )}
      </div>
   );
};
