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
                  style={{"color":"#ffffff","backgroundColor":"#50e3c2"}}
          > 
               <div
                
                style={  {"display":"flex","flexDirection":"row","gap":"81px","justifyContent":"center","alignItems":"center"} }       >
  
                  
                <Image
                  src="https://portal.mr/assets/logos/portal-logo/Logo-portal.svg"
                  alt="Logo"
                  width={160}  
                  height={160}  
                  className="mt-4 mx-auto  "
                /> 
                
              
              <span className="text-2xl text-justify  font-bold">
                Découvrez les offres d'emploi.
              </span> 
                   
                
              </div>
        
           <Form.Item
        label={<span  style={{"color":"#ffffff","fontSize":"14px"}} >Domaine : </span>}
 
              name="whq7nx4a35"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Domaine :  is required`,
                },
                
              ]}
            >
         
              
              <Select
                style={{width:"100%"}}
                placeholder="Domaine"
                mode="multiple"
              >
                <Select.Option key={0} value="Génie Logiciel">Génie Logiciel</Select.Option>
<Select.Option key={1} value="Santé">Santé</Select.Option>
<Select.Option key={2} value="Immobilier">Immobilier</Select.Option>
<Select.Option key={3} value="Télécommunications">Télécommunications</Select.Option>
<Select.Option key={4} value="Transport">Transport</Select.Option>
              </Select>
            </Form.Item>

           <Form.Item
        label={<span  style={{"color":"#ffffff","fontSize":"14px"}} >Type de contrat :</span>}
 
              name="8mepgga57tp"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Type de contrat : is required`,
                },
                
              ]}
            >
         
              
              <Checkbox.Group style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}}>
                <div className="flex flex-col space-y-2">
                  <Checkbox 
                  style={{"color":"#d0021b"}}
                  key={0} value="Emploi à temps plein">Emploi à temps plein</Checkbox>
<Checkbox 
                  style={{"color":"#d0021b"}}
                  key={1} value=" Stage"> Stage</Checkbox>
                </div>
              </Checkbox.Group>
            </Form.Item>

           <Form.Item
        label={<span  style={{"color":"#ffffff","fontSize":"14px"}} >Ville :</span>}
 
              name="cw2bxpnulus"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Ville : is required`,
                },
                
              ]}
            >
         
              
              <Select
                style={{width:"100%"}}
                placeholder="Ville De Residence"
                
              >
                <Select.Option key={0} value="Atar">Atar</Select.Option>
<Select.Option key={1} value="Nktt">Nktt</Select.Option>
<Select.Option key={2} value="Ndb">Ndb</Select.Option>
<Select.Option key={3} value="Akjoujet">Akjoujet</Select.Option>
<Select.Option key={4} value="Roso">Roso</Select.Option>
              </Select>
            </Form.Item>

           <Form.Item
        label={<span  style={{"color":"#ffffff","fontSize":"14px"}} >Date de publication :</span>}
 
              name="g7n7e0pssg5"
              style={{ marginBottom: 8 }}
              rules={[
                {
                  required: false,
                  message: `Date de publication : is required`,
                },
                
              ]}
            >
         
              
              <Radio.Group style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px"}}>
                <div key={0} className="flex items-center"><Radio
                  style={{"color":"#d0021b"}}
                  
                  value=" Aujourd'hui"> Aujourd'hui</Radio></div>
<div key={1} className="flex items-center"><Radio
                  style={{"color":"#d0021b"}}
                  
                  value="Toutes Dates">Toutes Dates</Radio></div>
<div key={2} className="flex items-center"><Radio
                  style={{"color":"#d0021b"}}
                  
                  value="Les deux derniers jours">Les deux derniers jours</Radio></div>
<div key={3} className="flex items-center"><Radio
                  style={{"color":"#d0021b"}}
                  
                  value=" La semaine dernière"> La semaine dernière</Radio></div>
<div key={4} className="flex items-center"><Radio
                  style={{"color":"#d0021b"}}
                  
                  value="Le mois dernier">Le mois dernier</Radio></div>
              </Radio.Group>
            </Form.Item>
        <Form.Item>
          <Button
              className="h-10 font-bold  w-1/2" style={{"paddingLeft":"8px","paddingRight":"8px","paddingTop":"8px","paddingBottom":"8px","color":"#ffffff","borderRadius":"15px","backgroundColor":"#8b572a"}} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default GeneratedForm;