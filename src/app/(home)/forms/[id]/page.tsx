"use client";
import Designer from "@/components/forms/designer/Designer";
import DesignSkeleton from "@/components/skeletons/DesignSkeleton";
import useGeneral from "@/hooks/useGeneral";
import { useSearchParams } from 'next/navigation'; 
import { useEffect, useState, useCallback } from "react"; 

export default function FormDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const searchParams = useSearchParams();
  const { user } = useGeneral();
  const localStorageParam = searchParams.get('local');
  const { id } = params;
  const [form, setForm] = useState<Form | null>(null); // Initialize with null
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForm = useCallback(async () => { 
    if (localStorageParam === 'true') {
      try {
        const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        const form = forms.find((form: Form) => form.id === parseInt(id));
        if (form) {
          setForm(form);
        } else {
          setError("Form not found");
        }
      } catch (error) {
        console.error("Error fetching form from local storage:", error);
        setError("Error fetching form data");
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch(`/api/forms/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setForm(data.form);
      } catch (error) {
        console.error("Error fetching form:", error);
        setError("Error fetching form data");
      } finally {
        setLoading(false);
      }
    }
  }, [id, localStorageParam]);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  if (loading) {
    return <div className="w-full h-screen"> <DesignSkeleton/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user && localStorageParam !== 'true') {
    if (typeof window !== "undefined") {
      window.location.href = "/login"; 
    }
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <>
      <Designer isFromLocalStorage={localStorageParam === 'true'} form={form} />
    </>
  );
}
