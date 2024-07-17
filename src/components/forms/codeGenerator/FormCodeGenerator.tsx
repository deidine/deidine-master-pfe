import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Checkbox, Radio, DatePicker, TimePicker } from "antd";
import useDesigner from "@/hooks/useDesigner";




 

const FormCodeGenerator = ( ) => {
  const [componentCode, setComponentCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isTemplate, setIsTemplate] = useState(false);
  const [elementsTemplatePreview, setElementsTemplatePreview] = useState<FormElement[]>([]);
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
            <Select placeholder="${input.elementType.placeholder}" style={{ width: "100%" }}>
              ${input.elementType.options?.map((option, idx) => `<Select.Option key={${idx}} value="${option}">${option}</Select.Option>`).join('\n')}
            </Select>`;
          break;
        case "select_multiple":
          inputElement = `
            <Select mode="multiple" placeholder="${input.elementType.placeholder}" style={{ width: "100%" }}>
              ${input.elementType.options?.map((option, idx) => `<Select.Option key={${idx}} value="${option}">${option}</Select.Option>`).join('\n')}
            </Select>`;
          break;
        case "checkbox":
          inputElement = `
            <Checkbox.Group>
              <div className="flex flex-col space-y-2">
                ${input.elementType.options?.map((option, idx) => `<Checkbox key={${idx}} value="${option}">${option}</Checkbox>`).join('\n')}
              </div>
            </Checkbox.Group>`;
          break;
        case "radio":
          inputElement = `
            <Radio.Group>
              ${input.elementType.options?.map((option, idx) => `<div key={${idx}} className="flex items-center"><Radio value="${option}">${option}</Radio></div>`).join('\n')}
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
            ${input.elementType.pattern
              ? input.elementType.pattern.map((pattern, idx) => `{
                pattern: new RegExp("${pattern}"),
                message: \`Please match the requested format for ${input.elementType.label}\`,
                key: ${idx},
              }`).join(', ')
              : ''
            }
          ]}
        >
          ${inputElement}
        </Form.Item>`;
    });

    const exportCode = `
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        );
      };

      export default GeneratedForm;
    `;

    setComponentCode(exportCode);
    setIsModalOpen(true);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([componentCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "generated_code.tsx";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(componentCode);
      alert("Copied to clipboard!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy to clipboard!");
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">Thank you for submitting the form, you can close this page now.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        className="border border-zinc-200 bg-white hover:bg-zinc-100 h-9 rounded-lg text-zinc-800"
        type="button"
        onClick={generateComponentCode}
      >
        Export Form
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex overflow-y-auto items-center w-full justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-semibold mb-4">Generated Form Code</h2>
            <code>{componentCode}</code>
            <div className="flex justify-between">
              <button
                className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                onClick={copyToClipboard}
              >
                Copy Code
              </button>
              <button
                className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                onClick={downloadCode}
              >
                Download Code
              </button>
              <button
                className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
 
    </>
  );
};

export default FormCodeGenerator;
