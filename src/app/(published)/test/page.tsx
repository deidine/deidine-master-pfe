"use client"
import React from 'react';
import { Button, Form, Input, Select, Checkbox, Radio, DatePicker, TimePicker } from "antd";

const GeneratedForm = () => {
 const onFinish = async (values: any) => {
    console.log("Form submitted:", values);

    try {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Form successfully submitted:', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
      <Form
          onFinish={onFinish}
          layout="vertical"
          className="max-w-2xl mt-3 border shadow rounded-xl w-1/2 h-auto p-10 ml-4"
      >
          
          <Form.Item
              label="nom"
              name="03twqkfse2xk"
              style={{}}
              rules={[
                  {
                      required: false,
                      message: `nom is required`,
                  }, 
                  
                   {
                    pattern: new RegExp(""),
                    message: `Please match the requested format for nom`,

                  }     
              ]}>
              <Input style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="text" placeholder="nom" />
          </Form.Item>

          <Form.Item
              label="password"
              name="5igpem672v8"
              style={{}}
              rules={[
                  {
                      required: false,
                      message: `password is required`,
                  }, 
                  
                   {
                    pattern: new RegExp(""),
                    message: `Please match the requested format for password`,

                  }     
              ]}>
              <Input style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="password" placeholder="password" />
          </Form.Item>

          <Form.Item
              label="Label"
              name="hxidft49o8q"
              style={{}}
              rules={[
                  {
                      required: false,
                      message: `Label is required`,
                  }, 
                  
                   
                      {
            pattern: new RegExp("^(?:https?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-._~:\/?#[\]@!$&'()*+,;=.]+$"),
                      message: `Please match the requested format for Label`,

          } 
                       
              ]}>
              <Input style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="text" placeholder="Placeholder" />
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