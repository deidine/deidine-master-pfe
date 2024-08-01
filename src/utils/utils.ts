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
  });
};