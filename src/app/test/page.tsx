"use client";

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
    label="chriva"
    name="8oxf24hg8mc"
    style={{ marginBottom: "10px" }}
    rules={[
      {
        required: false,
        message: `chriva is required`,
      },
      
    ]}
  >
    <Input type="number" placeholder="Enter your data" />
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
