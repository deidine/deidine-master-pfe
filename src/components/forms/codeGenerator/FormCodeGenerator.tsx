import React, { useState } from "react"; 
import useDesigner from "@/hooks/useDesigner";
import { Button, message, Modal } from "antd";

const FormCodeGenerator = () => {
  const [componentCode, setComponentCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            <Select mode="multiple" placeholder="${input.elementType.placeholder}" style={{ width: "100%" }}>
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
            ${
              input.elementType.pattern
                ? input.elementType.pattern
                    .map(
                      (pattern, idx) => `{
                pattern: new RegExp("${pattern}"),
                message: \`Please match the requested format for ${input.elementType.label}\`,
                key: ${idx},
              }`
                    )
                    .join(", ")
                : ""
            }
          ]}
        >
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
    setIsModalOpen(true);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([componentCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "generated_code.tsx";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(componentCode);
      message.success("Copied to clipboard!");
     
      setIsModalOpen(false);
    } catch (error) { 
      message.error("Failed to copy: "+error);

    }
  };

  return (
    <>
      <Button
        className="btn_header bg-zinc-100"
       
        onClick={generateComponentCode}
      >
        Export Form
      </Button> 
         
      {isModalOpen && ( 
            <Modal
              title="Select Input Type"
              visible={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={[
             <div key="footer" className="flex flex-row justify-between w-full">
                 <Button
                  key="copy"
                  type="primary"
                  onClick={ 
                    copyToClipboard }
                >
                  copy
                </Button>,
                <Button
                  key="download"
                  type="primary"
                  onClick={ 
                    downloadCode }
                >
                  Download code
                </Button>
             </div>
              ]}
            >
              <code className=" whitespace-pre-wrap text-sm text-gray-900">
                {componentCode}
              </code>
            </Modal>  
      )}
    </>
  );
};

export default FormCodeGenerator;
