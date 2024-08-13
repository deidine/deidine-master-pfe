import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useDesigner from "@/hooks/useDesigner";
import { Button, message } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { openNotification } from "@/utils/utils";
import { generateComponentCodeNextJs } from "./langCode/nextJs";
import { generateComponentCodeReacttJs } from "./langCode/reactJs";
import { generateComponentCodeFlutter } from "./langCode/flutter";
 
interface FormCodeGeneratorProps { 
  onCopyComplete?: (componentCode: string) => void;
  onDownloadComplete?: ( componentCode: string) => void;
}

const FormCodeGenerator = forwardRef(({
  onCopyComplete, 
  onDownloadComplete
}: FormCodeGeneratorProps, ref)  =>  {
  const [componentCode, setComponentCode] = useState("");
  const { elements, submitBtn ,codeForLanguage} = useDesigner(); 
 
  
  useEffect(() => {
    {codeForLanguage === "NextJs" ? setComponentCode(  generateComponentCodeNextJs(elements,submitBtn)) 
      : codeForLanguage === "ReactJs" ? setComponentCode(  generateComponentCodeReacttJs(elements,submitBtn)): setComponentCode(  generateComponentCodeFlutter(elements,submitBtn))}
   }, [elements,codeForLanguage]);

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([componentCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "generated_code.tsx";
    document.body.appendChild(element);
    element.click();
    if (onDownloadComplete) {
      onDownloadComplete(componentCode);
    }
  };

  const copyToClipboard = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(componentCode);
    openNotification("topRight",'success', 'Copyed', "Copied to clipboard!");

        if (onCopyComplete) {
          onCopyComplete(componentCode);
        }
      } catch (error) {
        message.error("Failed to copy: " + error);
      }
    } else {
      // Fallback for unsupported environments
      const textArea = document.createElement("textarea");
      textArea.value = componentCode;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        openNotification("topRight",'success', 'Copyed', "Copied to clipboard!");
        if (onCopyComplete) {
          onCopyComplete(componentCode);
        }
      } catch (error) {
        message.error("Failed to copy: " + error);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };
  
  useImperativeHandle(ref, () => ({
    downloadCode,
    copyToClipboard,
  }));

  return (
    <div className="text-white my-6 rounded-lg mx-auto flex pl-[4.5rem] flex-col justify-center">
     
      <SyntaxHighlighter language="typescript" showLineNumbers style={codeStyle}>
        {componentCode}
      </SyntaxHighlighter>
    </div>
  );
});

export default FormCodeGenerator;
