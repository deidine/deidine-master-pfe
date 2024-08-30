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
    const getLabelStyles =  JSON.stringify( {
    
       
        color: getInputStyles?.color, 
        fontSize:  '14px', 
     
    });
  
    const formStyleString = JSON.stringify(getFormStyles);
  const logoStyleString = JSON.stringify({
   
    display:"flex",
    flexDirection:logoElement?.elementType.headingLogFlex  =="col" ? "column" : "row",
    gap: `${logoElement?.elementType.headingLogGap}px`,
    justifyContent: logoElement?.elementType.headingLogJustify,
    alignItems: logoElement?.elementType.headingLogJustify,
  });
  const getInputradiChecbox1 = { 
      paddingLeft: getInputStyles?.paddingX  || '8px',
      paddingRight: getInputStyles?.paddingX  || '8px',
      paddingTop: getInputStyles?.paddingY  || '8px',
      paddingBottom: getInputStyles?.paddingY || '8px', 
      border: getInputStyles?.border ,
      borderRadius: getInputStyles?.borderRadius ,
          };
   
  const getInputradiChecbox2 =  { 
      color: getInputStyles?.color, 
      border: getInputStyles?.border ,
      borderRadius: getInputStyles?.borderRadius ,
         
  };
    const HeadTitleStyleString = JSON.stringify(HeadTitleElement?.elementType.style);
    const isDividerExist=elements.some((element) => element.elementType.type === "divider");
    const componentCode = elements
      .filter(
        (element) =>
          element.elementType.type !== "logo" &&
          element.elementType.type !== "headingTitle"
      )
      .map((input) => {
        let inputElement = "";
  
        const inputStyleString = JSON.stringify(getInputStyles); 
        const dateTimeStyleString = JSON.stringify({...getInputStyles,width:"100%"}); 
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
                ${input.elementType.type === "select_multiple" ? 'mode="multiple"' : ""}
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
              <Checkbox.Group style={${JSON.stringify( getInputradiChecbox1)}}>
                <div className="flex flex-col space-y-2">
                  ${input.elementType.options
                ?.map(
                  (option, idx) =>
                    `<Checkbox 
                  style={${JSON.stringify( getInputradiChecbox2)}}
                  key={${idx}} value="${option}">${option}</Checkbox>`
                )
                .join("\n")}
                </div>
              </Checkbox.Group>`;
            break;
          case "radio":
            inputElement = `
              <Radio.Group style={${JSON.stringify( getInputradiChecbox1)}}>
                ${input.elementType.options
                ?.map(
                  (option, idx) =>
                    `<div key={${idx}} className="flex items-center"><Radio
                  style={${JSON.stringify( getInputradiChecbox2)}}
                  
                  value="${option}">${option}</Radio></div>`
                )
                .join("\n")}
              </Radio.Group>`;
            break;
          case "paragraph":
              inputElement = ` <p style={${JSON.stringify(paragraphStyles)}}   >
            ${input.elementType.label}
          </p>`;
          break;
  
          case "divider":
          inputElement = `<Separator
                  orientation="vertical"
                  decorative
                  style={{ height: ${input.elementType.heightDivider }+ "px" }}
                
                />`;
            break;
          default:
            break;
        }
  
        const patternRule = input.elementType.type === "url"
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
        label={<span  style={${getLabelStyles}} >${input.elementType.type=="divider"? "" : input.elementType.label}</span>}
 
              name="${input.elementType.name}"
              style={{ marginBottom: 8 }}
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
  
  ${isDividerExist ?
  `import { type ClassValue, clsx } from "clsx";
  import { twMerge } from "tailwind-merge";  
   
  import * as SeparatorPrimitive from '@radix-ui/react-separator';
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
   
  const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
  >(
    (
      { className, orientation = 'horizontal', decorative = true, ...props },
      ref,
    ) => (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          'shrink-0 border-neutral-200',
          orientation === 'horizontal'
            ? 'h-px w-full  border-t'
            : 'h-full w-px  border-l',
          className,
        )}
        {...props}
      />
    ),
  );
  Separator.displayName = SeparatorPrimitive.Root.displayName;
  
  export { Separator };
  ` : ""}
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
              <span className="text-2xl text-justify  font-bold">
                ${HeadTitleElement.elementType?.headingTitle}
              </span> 
                   
                `
                : ""
            }
              </div>
        ${componentCode}
        <Form.Item>
          <Button
              className="h-10 font-bold  w-1/2" style={${JSON.stringify(getButtonStyles)}} type="primary" htmlType="submit">
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
  