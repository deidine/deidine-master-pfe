import {
  FiSidebar,
  FiList,
  FiRadio,
  FiFile,
  FiCheckSquare,
  FiType,
  FiHash,
  FiMail,
  FiLock,
  FiAlignLeft,
  FiEyeOff,
  FiDatabase,
  FiHeadphones,
  FiExternalLink,
  FiDollarSign,
} from "react-icons/fi";

const patternOptions: PatternType[] = [
  {
    value: "phone",
    label: "Phone",
    allowedTypes: ["text", "number"],
    pattern: "\\d{10}",
    examplePattern: "1234567890",
    icon: FiHeadphones,
    bgColor: "#E8DEEE",
    textColor: "text-black",

  },
  {
    value: "email",
    label: "Email",
    allowedTypes: ["text", "email"],
    pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    examplePattern: "example@example.com",
    icon: FiMail,
    bgColor: "#E8DEEE",
    textColor: "text-black",

  },
 
  {
    value: "url",
    label: "URL",
    allowedTypes: ["text"],
    pattern:
      "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$",
    examplePattern: "https://www.example.com",
    icon: FiExternalLink,
    bgColor: "#E8DEEE",
    textColor: "text-black",

  },
  {
    value: "currency",
    label: "Currency",
    allowedTypes: ["text", "number"],
    pattern: "^\\$?\\d+(?:\\.\\d{2})?$",
    examplePattern: "$10.00",
    icon: FiDollarSign,
    bgColor: "#E8DEEE",
    textColor: "text-black",

  },
  {
    value: "password",
    label: "Password",
    allowedTypes: ["text", "password"],
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
    examplePattern: "Abc123!@#",
    icon: FiLock,
    bgColor: "#E8DEEE",
    textColor: "text-black",

  },
];
const filetypealow = [".pdf", ".txt", ".png"];

const dateliment = [{ curent: "a", end: "b", start: "c" }];
const selectTypeOptions = [
  {
    value: "select",
    label: "Select",
    bgColor: "#f1cc68",
    textColor: "text-black",
    icon: FiSidebar,
  },
  {
    value: "select_multiple",
    label: "Select Multiple",
    bgColor: "#d5eaee",
    textColor: "text-black",
    icon: FiList,
  },
  {
    value: "radio",
    label: "Radio",
    bgColor: "#f491be",
    textColor: "text-black",
    icon: FiRadio,
  },
  {
    value: "checkbox",
    label: "Checkbox",
    bgColor: "#d7ccd1",
    textColor: "text-black",
    icon: FiCheckSquare,
  },
];

const inputTypeOptions :InputTypeList[] = [
  {
    value: "text",
    label: "Text",
    bgColor: "#FDECC8",
    textColor: "text-black",
    icon: FiType,
  },
  {
    value: "file",
    label: "File",
    bgColor: "#FDECC8",
    textColor: "text-black",
    icon: FiFile,
  
  },
  {
    value: "time",
    label: "Time",
    bgColor: "#FDECC8",
    textColor: "text-black",
    icon: FiDatabase,
  },
  {
    value: "date",
    label: "Date",
    bgColor: "#FDECC8",
    textColor: "text-black",
    icon: FiDatabase,
  },
  {
    value: "datetime-local",
    label: "Date with time",
    bgColor: "#FDECC8",
    textColor: "text-black",
    icon: FiDatabase,
  },
  {
    value: "number",
    label: "Number",
    bgColor: "#E3E2E0",
    textColor: "text-black",
    icon: FiHash,
  },
  {
    value: "email",
    label: "Email",
    bgColor: "#DBEDDB",
    textColor: "text-black",
    icon: FiMail,
  },
  {
    value: "password",
    label: "Password",
    bgColor: "#E8DEEE",
    textColor: "text-black",
    icon: FiLock,
  },
  {
    value: "textarea",
    label: "Textarea",
    bgColor: "#F5E0E9",
    textColor: "text-black",
    icon: FiAlignLeft,
  },
];

const shortcuts = [
  { shortcut: "CTRL+S", title: "Save diagram", description: "" },
];

export { patternOptions, selectTypeOptions, dateliment,inputTypeOptions, shortcuts ,filetypealow};
