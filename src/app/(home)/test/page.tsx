"use client";
    import React from 'react';
  import Image from 'next/image';
  
  
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
                  style={{}}
          > 
               <div
                
                style={  {"display":"flex","flexDirection":"row","gap":"undefinedpx"} }       >
  
                  
                <Image
                  src="https://www.pngkey.com/png/detail/233-2332677_ega-png.png"
                  alt="Logo"
                  width={160}  
                  height={160}  
                  className="mt-4 mx-auto  "
                /> 
                
              
              <span className="text-2xl text-justify  font-bold">
                Titre de l'en-tête
              </span> 
                   
                
              </div>
        
        <Form.Item
        label={<span  style={{"fontSize":"16px","fontWeight":"bold","fontFamily":"sans-serif","fontStyle":"bold"}} >Label</span>}
 
              name="f4nkfvp74dr"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              
              <Select
                style={{width:"100%"}}
                placeholder="Placeholder"
                
              >
                <Select.Option key={0} value="Option 1">Option 1</Select.Option>
<Select.Option key={1} value="Option 2">Option 2</Select.Option>
              </Select>
            </Form.Item> 

        <Form.Item
        label={<span  style={{"fontSize":"16px","fontWeight":"bold","fontFamily":"sans-serif","fontStyle":"bold"}} >Label</span>}
 
              name="ovh3l8gm7co"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              <Input style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="text" placeholder="Placeholder" />
            </Form.Item> 

        <Form.Item
        label={<span  style={{"fontSize":"16px","fontWeight":"bold","fontFamily":"sans-serif","fontStyle":"bold"}} >Label</span>}
 
              name="tc4yj2b21o"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              <Input style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="email" placeholder="Placeholder" />
            </Form.Item> 

        <Form.Item
        label={<span  style={{"fontSize":"16px","fontWeight":"bold","fontFamily":"sans-serif","fontStyle":"bold"}} >Label</span>}
 
              name="lkzfz1atk8f"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              <Input style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="password" placeholder="Placeholder" />
            </Form.Item> 

        <Form.Item
        label={<span  style={{"fontSize":"16px","fontWeight":"bold","fontFamily":"sans-serif","fontStyle":"bold"}} >Label</span>}
 
              name="3jm33nz556e"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              
              <Checkbox.Group style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}}>
                <div className="flex flex-col space-y-2">
                  <Checkbox 
                  style={{}}
                  key={0} value="Option 1">Option 1</Checkbox>
<Checkbox 
                  style={{}}
                  key={1} value="Option 2">Option 2</Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item> 

        <Form.Item
        label={<span  style={{"fontSize":"16px","fontWeight":"bold","fontFamily":"sans-serif","fontStyle":"bold"}} >Label</span>}
 
              name="x58g7ch5uek"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              
              <Radio.Group style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}}>
                <div key={0} className="flex items-center"><Radio
                  style={{}}
                  
                  value="Option 1">Option 1</Radio></div>
<div key={1} className="flex items-center"><Radio
                  style={{}}
                  
                  value="Option 2">Option 2</Radio></div>
              </Radio.Group>
            </Form.Item> 

        <Form.Item
        label={<span  style={{"fontSize":"16px","fontWeight":"bold","fontFamily":"sans-serif","fontStyle":"bold"}} >Label</span>}
 
              name="uye8l00g0cr"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              
              <Select
                style={{width:"100%"}}
                placeholder="Placeholder"
                
              >
                <Select.Option key={0} value="Option 1">Option 1</Select.Option>
<Select.Option key={1} value="Option 2">Option 2</Select.Option>
              </Select>
            </Form.Item> 
        <div className="flex justify-center pt-6">
        
          <Button
              className="h-10 font-bold  w-1/2" style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="primary" htmlType="submit">
            Submit
          </Button>
         </div>
      </Form>
    );
  };
  
  export default GeneratedForm;