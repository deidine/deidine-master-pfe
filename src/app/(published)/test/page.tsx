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
                  style={{"borderRadius":"24px"}}
          > 
               <div
                
                style={  {"display":"flex","flexDirection":"row","gap":"undefinedpx","justifyContent":"center","alignItems":"center"} }       >
  
                  
                <Image
                  src="https://medeni.mr/_next/image?url=%2Flogos%2Fmedeni.png&w=256&q=100"
                  alt="Logo"
                  width={160}  
                  height={160}  
                  className="mt-4 mx-auto  "
                /> 
                
              
              <span className="text-2xl text-justify  font-bold">
                Medeni
              </span> 
                   
                
              </div>
        
           <Form.Item
              label="Nom "
              name="qlhzqhk7vi8"
              rules={[
                {
                  required: true,
                  message: `Nom  is required`,
                },
                
              ]}
            >
         
              <Input style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="text" placeholder="Votre Nom" />
            </Form.Item>

           <Form.Item
              label="Email"
              name="on1pbffi04"
              rules={[
                {
                  required: true,
                  message: `Email is required`,
                },
                
              ]}
            >
         
              <Input style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="email" placeholder="Votre Email" />
            </Form.Item>

           <Form.Item
              label="Telephone"
              name="0vs9emswystc"
              rules={[
                {
                  required: true,
                  message: `Telephone is required`,
                },
                
              ]}
            >
         
              <Input style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="number" placeholder="Numero Telephone" />
            </Form.Item>

           <Form.Item
              label="Remqraue"
              name="68qoezihay"
              rules={[
                {
                  required: true,
                  message: `Remqraue is required`,
                },
                
              ]}
            >
         
              <Input.TextArea style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} placeholder="Vos Remarque" />
            </Form.Item>

           <Form.Item
              label="Vous avez dejas faire un operation Achat/Louer ?"
              name="v9p20gb1gpq"
              rules={[
                {
                  required: true,
                  message: `Vous avez dejas faire un operation Achat/Louer ? is required`,
                },
                
              ]}
            >
         
              
              <Radio.Group style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}}>
                <div key={0} className="flex items-center"><Radio
                  style={{}}
                  
                  value="Oui">Oui</Radio></div>
<div key={1} className="flex items-center"><Radio
                  style={{}}
                  
                  value="Non">Non</Radio></div>
              </Radio.Group>
            </Form.Item>

           <Form.Item
              label="Quelle PlatForm Vous Avez Trouver Medeni?"
              name="zcimvazvxdp"
              rules={[
                {
                  required: true,
                  message: `Quelle PlatForm Vous Avez Trouver Medeni? is required`,
                },
                
              ]}
            >
         
              
              <Checkbox.Group style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}}>
                <div className="flex flex-col space-y-2">
                  <Checkbox 
                  style={{}}
                  key={0} value="FaceBook">FaceBook</Checkbox>
<Checkbox 
                  style={{}}
                  key={1} value="WhatsApp">WhatsApp</Checkbox>
<Checkbox 
                  style={{}}
                  key={2} value="Youtube">Youtube</Checkbox>
<Checkbox 
                  style={{}}
                  key={3} value="LinkedIn">LinkedIn</Checkbox>
<Checkbox 
                  style={{}}
                  key={4} value="Google">Google</Checkbox>
<Checkbox 
                  style={{}}
                  key={5} value="Autres">Autres</Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item>
        <Form.Item>
          <Button
              className="h-10 font-bold  w-1/2" style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default GeneratedForm;