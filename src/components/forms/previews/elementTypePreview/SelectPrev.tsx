import { Form, Select } from 'antd'
import React from 'react'

export default function SelectPrev({
    element,isMultiple}: {
    element: FormElement;
isMultiple?:boolean
}) {
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
                style={{ width: "100%" }}
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
              style={{ width: "100%" }}
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
