 
import { FiSidebar, FiList, FiRadio, FiFile,FiCheckSquare, FiType, FiHash, FiMail, FiLock, FiAlignLeft, FiEyeOff, FiDatabase } from 'react-icons/fi';

const patternOptions = [
  { value: "No Pattern", label: "No Pattern", pattern: "" },
  { value: "phone", label: "Phone", pattern: "\\d{10}" },
  {
      value: "email",
      label: "Email",
      pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
  },
  {
      value: "creditCard",
      label: "Credit Card",
      pattern: "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$",
  },
  {
      value: "zipCode",
      label: "Zip Code",
      pattern: "^\\d{5}(?:[-\\s]\\d{4})?$",
  }, 
  {
      value: "url",
      label: "URL",
      pattern: "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$",
  },
 
  {
      value: "currency",
      label: "Currency",
      pattern: "^\\$?\\d+(?:\\.\\d{2})?$",
  },
  {
      value: "password",
      label: "Password",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
  },
  
  // { value: "regex", label: "Custom Regex", pattern: customPattern },
];
  const selectTypeOptions  = [
    { value: "select", label: "Select", bgColor: "bg-[#f1cc68]", textColor: "text-black", icon: FiSidebar },
    { value: "select_multiple", label: "Select Multiple", bgColor: "bg-[#d5eaee]", textColor: "text-black", icon: FiList },
    { value: "radio", label: "Radio", bgColor: "bg-[#f491be]", textColor: "text-black", icon: FiRadio },
    { value: "checkbox", label: "Checkbox", bgColor: "bg-[#d7ccd1]", textColor: "text-black", icon: FiCheckSquare },
  ];
  
  const inputTypeOptions = [
    { value: "text", label: "Text", bgColor: "bg-[#FDECC8]", textColor: "text-black", icon: FiType },
    { value: "file", label: "File", bgColor: "bg-[#FDECC8]", textColor: "text-black", icon: FiFile },
    { value: "time", label: "Time", bgColor: "bg-[#FDECC8]", textColor: "text-black", icon: FiDatabase },
    { value: "date", label: "Date", bgColor: "bg-[#FDECC8]", textColor: "text-black", icon: FiDatabase },
    { value: "datetime-local", label: "Date with time", bgColor: "bg-[#FDECC8]", textColor: "text-black", icon: FiDatabase },
    { value: "number", label: "Number", bgColor: "bg-[#E3E2E0]", textColor: "text-black", icon: FiHash },
    { value: "email", label: "Email", bgColor: "bg-[#DBEDDB]", textColor: "text-black", icon: FiMail },
    { value: "password", label: "Password", bgColor: "bg-[#E8DEEE]", textColor: "text-black", icon: FiLock },
    { value: "textarea", label: "Textarea", bgColor: "bg-[#F5E0E9]", textColor: "text-black", icon: FiAlignLeft },
    
  ];

    const shortcuts = [
    { shortcut: "CTRL+S", title: "Save diagram", description: "" },]
 
export { patternOptions,selectTypeOptions,inputTypeOptions,shortcuts  }