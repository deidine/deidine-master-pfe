import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { notification } from "antd";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const openNotificationSuccess =( placement: any,message: string, description: string )=> {
  notification.success({
    message: `${message}`,
    description:
      `${description}`,
    placement,
  });
};
export const openNotificationErro =( placement: any,message: string, description: string )=> {
  notification.error({
    message: `${message}`,
    description:
      `${description}`,
    placement,
  });
};
export const openNotificationInfos =( placement: any,message: string, description: string )=> {
  notification.info({
    message: `${message}`,
    description:
      `${description}`,
    placement,
  });
};

export const openNotification = ( placement: any,type: 'success' | 'error' | 'info', message: string, description: string) => {
  notification[type]({
    message,
    description, placement,
  });
};