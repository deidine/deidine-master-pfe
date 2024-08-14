export const generateComponentCodeNextJs = (elements:FormElement[],submitBtn:string) => {
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

  return exportCode;
};