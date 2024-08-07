import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { notification } from "antd";
import useGeneral from "@/hooks/useGeneral";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
 

export const openNotification = ( placement: any,type: 'success' | 'error' | 'info', message: string, description: string) => {
  notification[type]({
    message,
    description, placement,
    // duration: 3
  });
};
export const deleteForm = async (id: number) : Promise<string|void> => {
  try {
    
    const response = await fetch(`/api/forms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
   
    if (!response.ok) {
      throw new Error("Error deleting form");
    }
    
return "Form deleted successfully from database"
  } catch (error) {
    
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    const updatedForms = forms.filter((form: Form) => form.id !== id);
    localStorage.setItem("forms", JSON.stringify(updatedForms)); 
    return   error ? "error deleting form" : "Form deleted successfully from Localstorage"

  }
}; 
export const saveToDatabase = async ( 
  title: string,
  content: FormElement[],
  description: string, 
  user_id:string,
  id?:number
): Promise<string|void> => {
 
console.error(content)
  try {
    const response = await fetch("/api/forms/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        title: title,
        content: content,
        description: description,
        user_id: user_id,
      }),
    });

    if (!response.ok) {
      throw new Error("Error inserting data");
    }
    
    const data = await response.json();
    console.log("Data inserted:", data);
 
    id && deleteForm(id);
  return "Data inserted successfully in database"
  } catch (error) {
    console.error("Error:", error);
  }
};