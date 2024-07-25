import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Checkbox, Radio, DatePicker, TimePicker } from "antd";
import useDesigner from "@/hooks/useDesigner";

export default function PreviewForm({
  isTemplate,
  showSubmit,
  elementsTemplate,
}: {
  isTemplate?: boolean;
  showSubmit?: boolean;
  elementsTemplate?: Form [];
}) {
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
    setSubmitted(true);
  };
  const [submitted, setSubmitted] = useState(false);
  const [isTemlate, setisTemlate] = useState<boolean>(isTemplate || false);
  const [elementsTemplatePreviw, setElementsTemplatePreviw] = useState<Form[]>(elementsTemplate!);
  const { elements, submitBtn } = useDesigner();
  const mapElement = isTemlate ? elementsTemplatePreviw : elements;

  useEffect(() => {
    setElementsTemplatePreviw(elementsTemplate!);
  }, [elementsTemplate]);

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">Thank you for submitting the form, you can close this page now.</p>
        </div>
      </div>
    );
  }

  return (
    <Form
      onFinish={onFinish}
      layout="vertical" // Set the layout to vertical
      className={`${!isTemplate ? "max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4" : ""}`}
    >
      {mapElement.map((element: any, index) => (
        <div key={index}>
          {["text", "number", "email", "password", "file", "textarea"].includes(element.elementType.type) && (
            <Form.Item
              label={element.elementType.label}
              name={element.elementType.name}
              style={{ marginBottom: "10px" }}
              rules={[
                {
                  required: element.elementType.required,
                  message: `${element.elementType.label} is required`,
                },
                ...(element.elementType.pattern
                  ? element.elementType.pattern.map((pattern: any, idx: number) => ({
                      pattern: new RegExp(pattern),
                      message: `Please match the requested format for ${element.elementType.label}`,
                      key: idx,
                    }))
                  : []),
              ]}
            >
              {element.elementType.type === "textarea" ? (
                <Input.TextArea
                  style={{ padding: "8px" }}
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
          )}
          {element.elementType.type === "date" && (
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
              <DatePicker
                placeholder={element.elementType.placeholder}
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          )}    {element.elementType.type === "datetime-local" && (
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
               <Input
                  style={{ padding: "8px" }}
                  type={element.elementType.type}
                  placeholder={element.elementType.placeholder}
                />
            </Form.Item>
          )}
          {element.elementType.type === "time" && (
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
              <TimePicker
                placeholder={element.elementType.placeholder}
                style={{ width: "100%" }}
                format="HH:mm:ss"
                showHour
                showMinute
              />
            </Form.Item>
          )}
          {element.elementType.type === "select" && (
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
                placeholder={element.elementType.placeholder}
                style={{ width: "100%" }}
              >
                {element.elementType.options!.map((option: any, idx: number) => (
                  <Select.Option key={idx} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {element.elementType.type === "select_multiple" && (
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
                {element.elementType.options!.map((option: any, idx: number) => (
                  <Select.Option key={idx} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {element.elementType.type === "checkbox" && (
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
                  {element.elementType.options!.map((option: any, idx: number) => (
                    <Checkbox key={idx} value={option}>
                      {option}
                    </Checkbox>
                  ))}
                </div>
              </Checkbox.Group>
            </Form.Item>
          )}
          {element.elementType.type === "radio" && (
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
                {element.elementType.options!.map((option: any, idx: number) => (
                  <div key={idx} className="flex items-center">
                    <Radio value={option}>{option}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </Form.Item>
          )}
        </div>
      ))}   
      <div className="flex justify-center pt-6">
      { showSubmit ?null : <Button
          type="primary"
          htmlType="submit"
          className="h-10 font-bold py-2 px-4 w-1/2"
        >
          {submitBtn}
        </Button> }  
      </div>
    </Form>
  );
}
