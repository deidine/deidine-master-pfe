export const generateComponentCodeNextJs = (
  elements: FormElement[],
  submitBtn: string,
  getFormStyles?: FormStyle,
  getInputStyles?: FormStyle
) => {
  const logoElement = elements.find(
    (element) => element.elementType.type === "logo"
  );
  const headTitleElement = elements.find(
    (element) => element.elementType.type === "headingTitle"
  );

  const inputStyleString = JSON.stringify(getInputStyles);
  const formStyleString = JSON.stringify(getFormStyles);

  const componentCode = elements.map((input) => {
    let inputElement = "";

    switch (input.elementType.type) {
      case "text":
      case "number":
      case "email":
      case "password":
      case "file":
        inputElement = `<Input style={${inputStyleString}} type="${input.elementType.type}" placeholder="${input.elementType.placeholder}" />`;
        break;
        
        case "url":
          inputElement = `<Input style={${inputStyleString}} type="text" placeholder="${input.elementType.placeholder}" />`;
          break;
      case "textarea":
        inputElement = `<Input.TextArea style={${inputStyleString}} placeholder="${input.elementType.placeholder}" />`;
        break;
      case "date":
        inputElement = `<DatePicker style={${inputStyleString}} placeholder="${input.elementType.placeholder}" style={{ width: "100%" }} format="YYYY-MM-DD" />`;
        break;
      case "time":
        inputElement = `<TimePicker style={${inputStyleString}} placeholder="${input.elementType.placeholder}" style={{ width: "100%" }} format="HH:mm:ss" showHour showMinute />`;
        break;
      case "select":
        inputElement = `
          <Select style={${inputStyleString}} placeholder="${input.elementType.placeholder}" style={{ width: "100%" }}>
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
          <Select style={${inputStyleString}} mode="multiple" placeholder="${input.elementType.placeholder}" style={{ width: "100%" }}>
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
          <Checkbox.Group style={${inputStyleString}}>
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
          <Radio.Group style={${inputStyleString}}>
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
        style={${formStyleString}}
        rules={[
          {
            required: ${input.elementType.required},
            message: \`${input.elementType.label} is required\`,
          }, 
                          {
                   ${input.elementType.type ==="url" ?
                  ` pattern: new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$')`:
                  ` pattern: new RegExp("${input.elementType.pattern}")`
                    }    ,
                      message: \`Please match the requested format for ${input.elementType.label}\`,
                  }  

        ]}
      >
        ${inputElement}
      </Form.Item>`;
  });

  const exportCode = `
"use client";
import React from 'react';
import { Button, Form, Input, Select, Checkbox, Radio, DatePicker, TimePicker } from "antd";

const GeneratedForm = () => {
  const onFinish = async (values: any) => {
    console.log("Form submitted:", values);

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Form successfully submitted:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Form
      onFinish={onFinish}
      layout="vertical"
      className="max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4"
    >
      ${logoElement ? `
        <LogoPrev
          element={logoElement}
          styleForm={${formStyleString}}
        />` : ''}
      
      ${headTitleElement ? `
        <HeadingTitlePrev
          element={headTitleElement}
          styleForm={${inputStyleString}}
        />` : ''}
      
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
