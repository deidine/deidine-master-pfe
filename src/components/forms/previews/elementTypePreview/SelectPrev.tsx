import { Form, Select } from 'antd'
import React from 'react'

export default function SelectPrev({
    element,isMultiple,
    styleForm,}: {
    element: FormElement;
isMultiple?:boolean
  styleForm?: FormStyle;
}) {
  const getInputStyles = () => {
    return {
      paddingLeft: styleForm?.paddingX  || '8px',
      paddingRight: styleForm?.paddingX  || '8px',
      paddingTop: styleForm?.paddingY  || '8px',
      paddingBottom: styleForm?.paddingY || '8px',
      color: styleForm?.color, 
      border: styleForm?.border ,
      borderRadius: styleForm?.borderRadius ,
      backgroundColor: styleForm?.backgroundColor,
      width: "100%" 
    };
  };
  
  return (
    <div>
        {!isMultiple ?         <Form.Item
              label={element.elementType.label}
              name={element.elementType.name}
              style={{ marginBottom: "10px" }}
              rules={[
                {
                  required: element.elementType.required,
                  message: `${element.elementType.label} is required`,
                },
              ]}
            >
              <Select
                placeholder={element.elementType.placeholder}
               
                style={getInputStyles()}
              >
                {element.elementType.options!.map(
                  (option: any, idx: number) => (
                    <Select.Option key={idx} value={option}>
                      {option}
                    </Select.Option>
                  )
                )}
              </Select>
            </Form.Item>

            :
            <Form.Item
            label={element.elementType.label}
            name={element.elementType.name}
            style={{ marginBottom: "10px" }}
            rules={[
              {
                required: element.elementType.required,
                message: `${element.elementType.label} is required`,
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder={element.elementType.placeholder}
              style={getInputStyles()}
            >
              {element.elementType.options!.map(
                (option: any, idx: number) => (
                  <Select.Option key={idx} value={option}>
                    {option}
                  </Select.Option>
                )
              )}
            </Select>
          </Form.Item>}
    </div>
  )
}
