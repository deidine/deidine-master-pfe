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
     style={{"color":"#6f1b1b","backgroundColor":"#50e3c2"}}
      >
             <div
                className="flex flex-row  items-center pb-2"
              >
                
                 
                  <div 
                  
         style={  {"color":"#6f1b1b","backgroundColor":"#50e3c2"} }
          >
            <Image
              src="https://www.pngkey.com/png/detail/233-2332677_ega-png.png"
              alt="Logo"
              width={160}  
              height={160}  
              className="mt-4 mx-auto  "
            />
          </div>
                 
                
                
                 
                   <div
         style={  {"color":"#6f1b1b","backgroundColor":"#50e3c2"} }
                   
       >
         <span className="text-2xl text-justify  font-bold">
           Titre de l'en-tête
         </span>
       </div>
                   
                
              </div>
        
           <Form.Item
              label="Label"
              name="cbvf0a1fk55"
             
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              <Input style={{"paddingLeft":"44px","paddingRight":"44px","paddingTop":"8px","paddingBottom":"8px","color":"#d67979","backgroundColor":"#7ed321"}} type="text" placeholder="Placeholder" />
            </Form.Item>

           <Form.Item
              label="Label"
              name="io4p4nj5dh"
             
              rules={[
                {
                  required: true,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              <TimePicker style={{"paddingLeft":"44px","paddingRight":"44px","paddingTop":"8px","paddingBottom":"8px","color":"#d67979","backgroundColor":"#7ed321"}} placeholder="Placeholder" format="HH:mm:ss" showHour showMinute />
            </Form.Item>

           <Form.Item
              label="Label"
              name="3aaatn3itcy"
             
              rules={[
                {
                  required: true,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              <DatePicker style={{"paddingLeft":"44px","paddingRight":"44px","paddingTop":"8px","paddingBottom":"8px","color":"#d67979","backgroundColor":"#7ed321"}} placeholder="Placeholder" format="YYYY-MM-DD" />
            </Form.Item>

           <Form.Item
              label="Label"
              name="vglu4waotrc"
             
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              <Input style={{"paddingLeft":"44px","paddingRight":"44px","paddingTop":"8px","paddingBottom":"8px","color":"#d67979","backgroundColor":"#7ed321"}} type="file" placeholder="Placeholder" />
            </Form.Item>

           <Form.Item
              label="Label"
              name="227i1q2uciq"
             
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              
              <Select
                style={{"paddingLeft":"44px","paddingRight":"44px","paddingTop":"8px","paddingBottom":"8px","color":"#d67979","backgroundColor":"#7ed321"}}
                placeholder="Placeholder"
                
              >
                <Select.Option key={0} value="Option 1">Option 1</Select.Option>
<Select.Option key={1} value="Option 2">Option 2</Select.Option>
              </Select>
            </Form.Item>

           <Form.Item
              label="Label"
              name="9z0wmgudvwd"
             
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              
              <Radio.Group style={{"paddingLeft":"44px","paddingRight":"44px","paddingTop":"8px","paddingBottom":"8px","color":"#d67979","backgroundColor":"#7ed321"}}>
                <div key={0} className="flex items-center"><Radio value="Option 1">Option 1</Radio></div>
<div key={1} className="flex items-center"><Radio value="Option 2">Option 2</Radio></div>
              </Radio.Group>
            </Form.Item>

           <Form.Item
              label="Label"
              name="7ibw7s51neh"
             
              rules={[
                {
                  required: false,
                  message: `Label is required`,
                },
                
              ]}
            >
         
              
              <Checkbox.Group style={{"paddingLeft":"44px","paddingRight":"44px","paddingTop":"8px","paddingBottom":"8px","color":"#d67979","backgroundColor":"#7ed321"}}>
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