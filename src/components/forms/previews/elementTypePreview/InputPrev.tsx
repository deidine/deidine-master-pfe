import { Form, Input } from 'antd'
import React from 'react'

export default function InputPrev(
    {
        element,
      }: {
        element: FormElement;
      }
) {
  return (
    <div>
            <Form.Item
              label={element.elementType.label}
              name={element.elementType.name}
              style={{ marginBottom: "10px" }}
              rules={[
                {
                  required: element.elementType.required,
                  message: `${element.elementType.label} is required`,
                },
                {
                  pattern: new RegExp(element.elementType.pattern!),
                  message: `Please match the requested format for ${element.elementType.label}`,
                },
              ]}
            >
              {element.elementType.type === "textarea" ? (
                <Input.TextArea
                  style={{ padding: "8px" }}
                  placeholder={element.elementType.placeholder}
                />
              ) : element.elementType.type === "file" ? (
                <Input
                  style={{ padding: "8px" }}
                  type="file"
                  
                  accept={element.elementType.allowedEtentions}
                  placeholder={element.elementType.placeholder}
                />
              ) : (
                <Input
                  style={{ padding: "8px" }}
                  type={element.elementType.type}
                  placeholder={element.elementType.placeholder}
                />
              )}
            </Form.Item>

    </div>
  )
}
