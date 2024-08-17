import { Form, Input } from 'antd';
import React, { useEffect } from 'react';

export default function  InputPrev({
  element,
  styleForm,
}: {
  element: FormElement;
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
    };
  };
  
  return (
    <div>  
      <Form.Item
        style={{ marginBottom: "10px" ,color:"blue"}}
        name={element.elementType.name}
        label={element.elementType.label}
        rules={[
          {
            required: element.elementType.required,
            message: `${element.elementType.label} is required`,
          },
          {
            pattern: element.elementType.type === "url" ? 
              new RegExp("^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$")
              : new RegExp(element.elementType.pattern!),
            message: `Please match the requested format for ${element.elementType.label}`,
          },
        ]}
      >
        {element.elementType.type === "textarea" ? (
          <Input.TextArea
            style={getInputStyles()}
            placeholder={element.elementType.placeholder}
          />
        ) : element.elementType.type === "file" ? (
          <Input
            style={getInputStyles()}
            type="file"
            accept={element.elementType.allowedEtentions!}
            placeholder={element.elementType.placeholder}
          />
        ) : (
          <Input
            style={getInputStyles()}
            type={element.elementType.type}
            placeholder={element.elementType.placeholder}
          />
        )}
      </Form.Item>
    </div>
  );
}
