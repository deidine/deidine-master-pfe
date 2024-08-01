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
export const saveToDatabase = async (
  id: number,
  title: string,
  content: FormElement[],
  description: string,user_id: number,isSaveAll?: boolean
) => {
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