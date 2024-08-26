"use client";
import PreviewPublished from "@/components/forms/previews/PreviewPublished";
import React, { useState, useEffect, useCallback } from "react";

export default function PublishFormPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [form, setForm] = useState<Form | null>(null); // Initialize with null
  const [loading, setLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState(false);
  const { id } = params;

  const fetchForm = useCallback(async () => { 
    try {
      const response = await fetch(`/api/forms/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setForm(data.form);
      console.log("Form fetched:", data.form);
    } catch (error) {
      console.error("Error fetching form:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const onFinish = async (values: any) => {
    console.log("Form submitted:", values);
    setSubmitted(true);
    const val: any[] = values;
    try {
      const response = await fetch(`/api/submtion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: val, formId: id }), // Sending the values as content
      });

      if (!response.ok) {
      }        throw new Error('Failed to submit form');


      const data = await response.json();
      console.log('Form data submitted:', data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading state if needed
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div className="flex justify-center items-center w-full my-auto h-full">
      <PreviewPublished form={form} onFinish={onFinish} />
    </div>
  );
}
