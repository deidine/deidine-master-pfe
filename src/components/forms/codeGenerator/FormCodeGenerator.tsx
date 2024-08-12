import React, { useEffect, useState } from "react";
import useDesigner from "@/hooks/useDesigner";
import { Button, message } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

const FormCodeGenerator = () => {
  const [componentCode, setComponentCode] = useState("");
  const { elements, submitBtn } = useDesigner();

  const generateComponentCode = () => {
    const componentCode = elements.map((input, index) => {
      let inputElement = "";

      switch (input.elementType.type) {
        case "text":
        case "number":
        case "email":
        case "password":
        case "file":
          inputElement = `<Input type="${input.elementType.type}" placeholder="${input.elementType.placeholder}" />`;
          break;
        case "textarea":
          inputElement = `<Input.TextArea placeholder="${input.elementType.placeholder}" />`;
          break;
        case "date":
          inputElement = `<DatePicker placeholder="${input.elementType.placeholder}" style={{ width: "100%" }} format="YYYY-MM-DD" />`;
          break;
        case "time":
          inputElement = `<TimePicker placeholder="${input.elementType.placeholder}" style={{ width: "100%" }} format="HH:mm:ss" showHour showMinute />`;
          break;
        case "select":
          inputElement = `
            <Select placeholder="${
              input.elementType.placeholder
            }" style={{ width: "100%" }}>
              ${input.elementType.options
                ?.map(
                  (option, idx) =>
                    `<Select.Option key={${idx}} value="${option}">${option}</Select.Option>`
                )
                .join("\n")}
            </Select>`;
          break;
        case "select_multiple":
          inputElement = `
            <Select mode="multiple" placeholder="${
              input.elementType.placeholder
            }" style={{ width: "100%" }}>
              ${input.elementType.options
                ?.map(
                  (option, idx) =>
                    `<Select.Option key={${idx}} value="${option}">${option}</Select.Option>`
                )
                .join("\n")}
            </Select>`;
          break;
        case "checkbox":
          inputElement = `
            <Checkbox.Group>
              <div className="flex flex-col space-y-2">
                ${input.elementType.options
                  ?.map(
                    (option, idx) =>
                      `<Checkbox key={${idx}} value="${option}">${option}</Checkbox>`
                  )
                  .join("\n")}
              </div>
            </Checkbox.Group>`;
          break;
        case "radio":
          inputElement = `
            <Radio.Group>
              ${input.elementType.options
                ?.map(
                  (option, idx) =>
                    `<div key={${idx}} className="flex items-center"><Radio value="${option}">${option}</Radio></div>`
                )
                .join("\n")}
            </Radio.Group>`;
          break;
        default:
          break;
      }

      return `
        <Form.Item
          label="${input.elementType.label}"
          name="${input.elementType.name}"
          style={{ marginBottom: "10px" }}
          rules={[
            {
              required: ${input.elementType.required},
              message: \`${input.elementType.label} is required\`,
            }, 
            {
              pattern: new RegExp("${input.elementType.pattern}"),
              message: \`Please match the requested format for ${input.elementType.label}\`,
            }  
          ]}>
          ${inputElement}
        </Form.Item>`;
    });

    const exportCode = `
"use client" 
import React from 'react';
import { Button, Form, Input, Select, Checkbox, Radio, DatePicker, TimePicker } from "antd";

const GeneratedForm = () => {
  const onFinish = (values:any) => {
    console.log("Form submitted:", values);
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4"
    >
      ${componentCode.join("\n")}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          ${submitBtn}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GeneratedForm;
    `.trim();

    setComponentCode(exportCode);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([componentCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "generated_code.tsx";
    document.body.appendChild(element);
    element.click();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(componentCode);
      message.success("Copied to clipboard!");
    } catch (error) {
      message.error("Failed to copy: " + error);
    }
  };

  useEffect(() => {
    generateComponentCode();
  }, [elements]);

  return (
    <div className="  text-white my-6 rounded-lg shadow-lg mx-auto flex flex-col justify-center">
      <div className="flex justify-between space-x-5 px-4 py-4">
        <Button key="copy" type="primary" onClick={copyToClipboard}>
          Copy
        </Button>
        <Button key="download" type="primary" onClick={downloadCode}>
          Download Code
        </Button>
      </div>
      <SyntaxHighlighter language="typescript" style={codeStyle}>
        {componentCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default FormCodeGenerator;
