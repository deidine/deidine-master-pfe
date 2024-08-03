import { Form, Radio } from 'antd'
import React from 'react'

export default function RadioPrev(
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
              ]}
            >
              <Radio.Group>
                {element.elementType.options!.map(
                  (option: any, idx: number) => (
                    <div key={idx} className="flex items-center">
                      <Radio value={option}>{option}</Radio>
                    </div>
                  )
                )}
              </Radio.Group>
            </Form.Item>
    </div>
  )
}
