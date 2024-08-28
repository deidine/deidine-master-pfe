import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import useDesigner from "@/hooks/useDesigner";
import { message, Modal } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { openNotification } from "@/utils/utils";
import { generateComponentCodeNextJs } from "./langCode/nextJs";
import { generateComponentCodeReacttJs } from "./langCode/reactJs";
import { generateComponentCodeFlutter } from "./langCode/flutter";
import useStyle from "@/hooks/useStyle"; 
import { generateComponentCodeHTML } from "./langCode/html";
interface FormCodeGeneratorProps { 
  onCopyComplete?: (componentCode: string) => void;
  onDownloadComplete?: ( componentCode: string) => void;
}

const FormCodeGenerator = forwardRef(({
  onCopyComplete, 
  onDownloadComplete
}: FormCodeGeneratorProps, ref)  =>  {

FormCodeGenerator.displayName = 'FormCodeGenerator';
  const [componentCode, setComponentCode] = useState("");
  const { elements, submitBtn ,codeForLanguage} = useDesigner(); 
 
  
const  { formStyle,elementStyle,buttonStyle, paragraphStyle}=useStyle(); 
const getFormStyles :FormStyle =  {
  
    paddingLeft: formStyle?.paddingX  ,
    paddingRight: formStyle?.paddingX  ,
    paddingTop: formStyle?.paddingY  ,
    paddingBottom: formStyle?.paddingY ,
    color: formStyle?.color, 
    border: formStyle?.border ,
    borderRadius: formStyle?.borderRadius ,
    backgroundColor: formStyle?.backgroundColor,
  
};
const getInputStyles:FormStyle =  {
  paddingLeft: elementStyle?.paddingX  || '8px',
  paddingRight: elementStyle?.paddingX  || '8px',
  paddingTop: elementStyle?.paddingY  || '8px',
  paddingBottom: elementStyle?.paddingY || '8px',
  color: elementStyle?.color, 
  border: elementStyle?.border ,
  borderRadius: elementStyle?.borderRadius ,
  backgroundColor: elementStyle?.backgroundColor,

};
const paragraphStyles:FormStyle =  {
  paddingLeft: paragraphStyle?.paddingX  || '8px',
  paddingRight: paragraphStyle?.paddingX  || '8px',
  paddingTop: paragraphStyle?.paddingY  || '8px',
  paddingBottom: paragraphStyle?.paddingY || '8px',
  color: paragraphStyle?.color,  
  fontSize : paragraphStyle?.borderRadius|| '20px' , 
}
const getButtonStyles:FormStyle =  {
  paddingLeft: buttonStyle?.paddingX  || '8px',
  paddingRight: buttonStyle?.paddingX  || '8px',
  paddingTop: buttonStyle?.paddingY  || '8px',
  paddingBottom: buttonStyle?.paddingY || '8px',
  color: buttonStyle?.color, 
  border: buttonStyle?.border ,
  borderRadius: buttonStyle?.borderRadius ,
  backgroundColor: buttonStyle?.backgroundColor,

};

useEffect(() => {
  {codeForLanguage === "NextJs" ? setComponentCode(  generateComponentCodeNextJs(elements, submitBtn, getFormStyles,
    getInputStyles, getButtonStyles,paragraphStyles)) 
  : codeForLanguage === "ReactJs" ? setComponentCode(  generateComponentCodeReacttJs(elements, submitBtn, getFormStyles,
  getInputStyles, getButtonStyles,paragraphStyles)) 
    : codeForLanguage === "Html5" ? setComponentCode(  generateComponentCodeHTML(
      elements, submitBtn, getFormStyles,
    getInputStyles))
  : setComponentCode(  generateComponentCodeFlutter(elements, submitBtn, formStyle, elementStyle, elementStyle))}
}, [elements, codeForLanguage, submitBtn, formStyle, elementStyle, getFormStyles, getInputStyles]);
const downloadCode = () => {
  const element = document.createElement("a");
  const file = new Blob([componentCode], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = (codeForLanguage === "NextJs" || codeForLanguage === "ReactJs") ? "generated_code.tsx" : codeForLanguage=="Html5" ? "generated_code.html" : "generated_code.dart";
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
    openNotification("topRight",'success', 'Copyed', "copie dans clipboard!");

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
     <div className="text-white w-[80%] my-10 rounded-lg mx-auto flex px-[6.5rem] flex-col justify-center">
      <SyntaxHighlighter  customStyle={{ width: "auto" , }} language="typescript" showLineNumbers style={codeStyle}>
        {componentCode}
      </SyntaxHighlighter>
    </div>
  );
});

export default FormCodeGenerator;
