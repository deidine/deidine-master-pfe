export const generateComponentCodeNextJs = (
  elements: FormElement[],
  submitBtn: string,
  getFormStyles?: FormStyle, 
  getInputStyles?: FormStyle,
  
  getButtonStyles?: FormStyle,
  paragraphStyles?: FormStyle,
) => {
  const logoElement = elements.find(
    (element) => element.elementType.type === "logo"
  );
  const HeadTitleElement = elements.find(
    (element) => element.elementType.type === "headingTitle"
  );
  const formStyleString = JSON.stringify(getFormStyles);
  const logoStyleString = JSON.stringify({
    ...getFormStyles,
    flex: logoElement?.elementType.headingLogFlex!,
    gap: `${logoElement?.elementType.headingLogGap}px`,
    justifyContent: logoElement?.elementType.headingLogJustify,
  });
  const HeadTitleStyleString = JSON.stringify(
    HeadTitleElement?.elementType.style
  );
  const componentCode = elements
    .filter(
      (element) =>
        element.elementType.type !== "logo" &&
        element.elementType.type !== "headingTitle"
    )
    .map((input) => {
      let inputElement = "";
      const dateTimeStyleString = JSON.stringify({...getInputStyles,width:"100%"}); 

      const inputStyleString = JSON.stringify(getInputStyles);
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
            inputElement = `<DatePicker style={${dateTimeStyleString}} placeholder="${input.elementType.placeholder}" format="YYYY-MM-DD" />`;
            break;
          case "time":
            inputElement = `<TimePicker style={${dateTimeStyleString}} placeholder="${input.elementType.placeholder}" format="HH:mm:ss" showHour showMinute />`;
            break;
        case "select":
        case "select_multiple":
          inputElement = `
              <Select
                style={{width:"100%"}}

                placeholder="${input.elementType.placeholder}"
                ${
                  input.elementType.type === "select_multiple"
                    ? 'mode="multiple"'
                    : ""
                }
              >
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
          break;
          case "paragraph":
              inputElement = ` <p style={${JSON.stringify(paragraphStyles)}}   >
            ${input.elementType.label}
          </p>`
        default:
          break;
      }

      const patternRule =
        input.elementType.type === "url"
          ? `{
              pattern: new RegExp("^(?:https?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-._~:\\/?#[\\]@!$&'()*+,;=.]+$"),
              message: \`Please match the requested format for ${input.elementType.label}\`,
            }`
          : input.elementType.pattern
          ? `{
              pattern: new RegExp("${input.elementType.pattern}"),
              message: \`Please match the requested format for ${input.elementType.label}\`,
            }`
          : "";

      return `
           <Form.Item
              label="${input.elementType.label}"
              name="${input.elementType.name}"
             
              rules={[
                {
                  required: ${input.elementType.required},
                  message: \`${input.elementType.label} is required\`,
                },
                ${patternRule}
              ]}
            >
         
              ${inputElement}
            </Form.Item>`;
    })
    .join("\n");

  const exportCode = `
  "use client";
    import React from 'react';
  import Image from 'next/image';
  
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
        style={${formStyleString}}
      >
             <div
              className="flex flex-${
                logoElement?.elementType.headingLogFlex
              } items-center pb-2"
              style={  ${logoStyleString} }       >

              ${
                logoElement?.elementType.type === "logo"
                  ? `  
              <Image
                src="${logoElement.elementType?.imgLogoLink}"
                alt="Logo"
                width={160}  
                height={160}  
                className="mt-4 mx-auto  "
              /> 
              `
                  : ""
              }
          ${
              HeadTitleElement?.elementType.type === "headingTitle"
              ? ` 
            <div style={  ${JSON.stringify(getFormStyles)} } >
            <span className="text-2xl text-justify  font-bold">
              ${HeadTitleElement.elementType?.headingTitle}
            </span>
            </div>
                 
              `
              : ""
          }
            </div>
            ${componentCode}
        <Form.Item>
          <Button     className="h-10 font-bold  w-1/2" style={${JSON.stringify(getButtonStyles)}}  type="primary" htmlType="submit">
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
