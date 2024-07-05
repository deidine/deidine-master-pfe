"use client"
import React, { useEffect, useRef } from "react";

const AutoResizeTextarea = ({
  inputLabel,
  handleLabelChange,
  isEditing,
}: {
  inputLabel: string;
  handleLabelChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isEditing: boolean;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputLabel]);

  return (
    <div className="w-full mb-1 relative h-auto">
      <textarea
        ref={textareaRef}
        placeholder="label"
        className={`
          resize-none p-0 focus:outline-none w-full overflow-hidden
          ${isEditing ? "text-xl font-bold" : "font-bold line-through"}
        `}
        readOnly = {!isEditing}
        value={inputLabel}
        onChange={(e) => {
          handleLabelChange!(e);
          const textarea = e.target;
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }}
      />
    </div>
  );
};

export default AutoResizeTextarea;
