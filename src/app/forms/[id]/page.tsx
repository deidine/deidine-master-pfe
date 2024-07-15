"use client"
import Designer from "@/components/dashboard/Designer";
import {
  GetFormById
} from "@/utils/utilsFunctions";
import { useEffect } from "react";

export default function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  let form  =null;
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch(`/api/forms/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      form=data.forms;
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };
 
  if (!form) {
    throw new Error("form not found");
  }
  return (
    <>
      <Designer form={form} />
    </>
  );
}
