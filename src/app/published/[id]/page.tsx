"use client";
import React, { useState, useEffect } from "react";
import {  Button,  Form } from "antd";
import { useSearchParams } from 'next/navigation' 
import SelectPrev from "@/components/forms/previews/elementTypePreview/SelectPrev";
import CheckBoxPrev from "@/components/forms/previews/elementTypePreview/CheckBoxPrev";
import DatePrev from "@/components/forms/previews/elementTypePreview/DatePrev";
import InputPrev from "@/components/forms/previews/elementTypePreview/InputPrev";
import RadioPrev from "@/components/forms/previews/elementTypePreview/RadioPrev";
 
export default function PublishFormPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [form, setForm] = useState<Form >( ); 
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = params;
 
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
    setSubmitted(true);
  };
  const [submitted, setSubmitted] = useState(false); 
 
  useEffect(() => {
    fetchForm();
  }, []);
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script");
    script.src = "https://app.rapidforms.co/embed/index.js";
    script.async = true;

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup script when component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const fetchForm = async () => { 
  
      try {
        const response = await fetch(`/api/forms/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setForm(data.form);
      } catch (error) {
        console.error("Error fetching form:", error);
      } finally {
        setLoading(false);
      }
  
  };
  if (!form) {
    return <div>Form not found</div>;
  }
  return (
    <>
      <iframe
        loading="lazy"
        id="rapidforms-iframe"
        src="https://app.rapidforms.co/embed/fb8460"
        width="100%"
        height="640px"
        frameBorder="0" 
        title="RapidForms"
      ></iframe>
    <Form
      onFinish={onFinish}
      layout="vertical" // Set the layout to vertical
    
    >
    <span className="text-md font-semibold"> {form!.content.length==0 && "No elements to Preview"}</span> 

      {form!.content.map((element: any, index) => (
        <div key={index}>
          {["text", "number", "email", "password", "file", "textarea","url"].includes(
            element.elementType.type
          ) && <InputPrev element={element} />}

          {["datetime-local", "date"].includes(element.elementType.type) && (
            <DatePrev element={element} />
          )}

          {element.elementType.type === "time" && (
         <DatePrev element={element} isTime={true} />
          )}

          {element.elementType.type === "select" && (
            <SelectPrev element={element} />
          )}
          {element.elementType.type === "select_multiple" && (
            <SelectPrev element={element} isMultiple={true} />
         
          )}
          {element.elementType.type === "checkbox" && (
            <CheckBoxPrev element={element} />
          )}
          {element.elementType.type === "radio" && (
            <RadioPrev element={element} />
          )}
        </div>
      ))}
      <div className="flex justify-center pt-6">
      (
          <Button
            type="primary"
            htmlType="submit"
            className="h-10 font-bold py-2 px-4 w-1/2"
          >
            "submitBtn"
          </Button>
        ) 
      </div>

    </Form>
    </>
  );
}

