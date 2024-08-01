import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { notification } from "antd";

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
export const deleteForm = async (id: number) => {
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
    openNotification("topRight","success","Form deleted successfully", "Form deleted successfully from database");

  } catch (error) {
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    const updatedForms = forms.filter((form: Form) => form.id !== id);
    localStorage.setItem("forms", JSON.stringify(updatedForms));
    updatedForms[0].isFromLocalStorage &&  openNotification("topRight",'success',"Form deleted successfully", "Form deleted successfully from Localstorage");
    // !updatedForms[0].isFromLocalStorage &&    openNotificationErro("topRight","Error Deleting  forms :", ""+error);

  }
}; 
export const saveToDatabase = async (
  id: number,
  title: string,
  content: FormElement[],
  description: string, isSaveAll?: boolean
) => {
  const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
const user_id = user?.id;
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
    // deleteForm(id);
    !isSaveAll && openNotification ("topRight",'success',"Data inserted:", "Data inserted successfully in database");
  } catch (error) {
    console.error("Error:", error);
  }
};