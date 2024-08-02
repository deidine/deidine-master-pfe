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
          name="kzl7xkxxzm"
          style={{ marginBottom: "10px" }}
          rules={[
            {
              required: false,
              message: `Label is required`,
            }, 
               {
                pattern: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"),
                message: `Please match the requested format for Label`,
                
              } ]}>
       
          <Input type="password" placeholder="Enter your data" />
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