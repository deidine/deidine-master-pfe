"use client" 
import React from 'react';
import { Button, Form, Input, Select, Checkbox, Radio, DatePicker, TimePicker } from "antd";

const GeneratedForm = () => {
  const onFinish = (values:any) => {
    console.log("Form submitted:", values);
  };

return (
  <Form
    onFinish={onFinish}
    layout="vertical"
    className="max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4"
  >
    
        <Form.Item
          label="Label"
          name="dycmfimnh5"
          style={{ marginBottom: "10px" }}
          rules={[
            {
              required: false,
              message: `Label is required`,
            }, 
               {
                pattern: new RegExp(""),
                message: `Please match the requested format for Label`,
                
              }  ]}>
       
          
            <Select mode="multiple" placeholder="Enter your data" style={{ width: "100%" }}>
              <Select.Option key={0} value="Option 1">Option 1</Select.Option>
<Select.Option key={1} value="Option 2">Option 2</Select.Option>
            </Select>
        </Form.Item>

        <Form.Item
          label="Label"
          name="p6cbfus7r8"
          style={{ marginBottom: "10px" }}
          rules={[
            {
              required: false,
              message: `Label is required`,
            }, 
               {
                pattern: new RegExp(""),
                message: `Please match the requested format for Label`,
                
              }  ]}>
       
          <Input type="file" placeholder="Enter your data" />
        </Form.Item>

        <Form.Item
          label="Label"
          name="ctye2o1sooi"
          style={{ marginBottom: "10px" }}
          rules={[
            {
              required: true,
              message: `Label is required`,
            }, 
               {
                pattern: new RegExp(""),
                message: `Please match the requested format for Label`,
                
              }  ]}>
       
          
            <Checkbox.Group>
              <div className="flex flex-col space-y-2">
                <Checkbox key={0} value="Option 1">Option 1</Checkbox>
<Checkbox key={1} value="Option 2">Option 2</Checkbox>
              </div>
            </Checkbox.Group>
        </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
};

export default GeneratedForm;