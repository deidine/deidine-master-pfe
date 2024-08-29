import { Checkbox, Form } from 'antd'
import React from 'react'

export default function CheckBoxPrev({
    element,
    styleForm,}: {
    element: FormElement;
    styleForm?: FormStyle;}) {
 
      const getInputStyles = () => {
        return {
          paddingLeft: styleForm?.paddingX  || '8px',
          paddingRight: styleForm?.paddingX  || '8px',
          paddingTop: styleForm?.paddingY  || '8px',
          paddingBottom: styleForm?.paddingY || '8px',
          color: styleForm?.color, 
          border: styleForm?.border ,
          borderRadius: styleForm?.borderRadius ,
          // backgroundColor: styleForm?.backgroundColor,
        };
      };
      const getInputStyles2 = () => {
        return { 
          color: styleForm?.color, 
          border: styleForm?.border ,
          borderRadius: styleForm?.borderRadius ,
              };
      };
      const getLabelStyles = () => {
        return {
          paddingLeft: styleForm?.paddingX || '8px',
          paddingRight: styleForm?.paddingX || '8px', 
          color: styleForm?.color,
          border: styleForm?.border, 
                fontWeight: styleForm?.labelFontWeight || 'normal',
          fontSize: styleForm?.labelFontSize || '14px', 
        };
      };
           return (
    
    <div>
                    <Form.Item
              name={element.elementType.name}
              style={{ marginBottom: "10px" }}
              label={<span  >{element.elementType.label}</span>}
              labelCol={{ span: 24 }} // Adjust label width, or remove for default
             
              valuePropName="checked"
              rules={[
                {
                  required: element.elementType.required,
                  message: `${element.elementType.label} is required`,
                },
              ]}
            >
              <Checkbox.Group
              style={getInputStyles()}
              
              >
                <div className="flex flex-col space-y-2">
                  {element.elementType.options!.map(
                    (option: any, idx: number) => (
                      <Checkbox  style={getInputStyles2()}
                      key={idx} value={option}>
                        {option}
                      </Checkbox>
                    )
                  )}
                </div>
              </Checkbox.Group>
            </Form.Item>
    </div>
  )
}
