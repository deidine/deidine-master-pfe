import { Checkbox, Form } from 'antd'
import React from 'react'

export default function CheckBoxPrev({
    element,}: {
    element: FormElement;}) {
  return (
    <div>
                    <Form.Item
              name={element.elementType.name}
              style={{ marginBottom: "10px" }}
              valuePropName="checked"
              rules={[
                {
                  required: element.elementType.required,
                  message: `${element.elementType.label} is required`,
                },
              ]}
            >
              <Checkbox.Group>
                <div className="flex flex-col space-y-2">
                  {element.elementType.options!.map(
                    (option: any, idx: number) => (
                      <Checkbox key={idx} value={option}>
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
