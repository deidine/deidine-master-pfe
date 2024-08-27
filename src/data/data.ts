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
  FiDatabase,
  FiHeadphones,
  FiExternalLink,
  FiBold,
  FiImage,
} from "react-icons/fi";
import { FaReact } from "react-icons/fa6";
import { SiFlutter, SiHtml5 } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
const patternOptions: PatternType[] = [
  {
    value: "phone",
    label: "Phone",
    allowedTypes: [  "number"],
    pattern: "\\d{10}",
    examplePattern: "1234567890",
    icon: FiHeadphones,
    bgColor: "#E8DEEE",
    textColor: "text-black",

  },
  {
    value: "email",
    label: "Email",
    allowedTypes: [ "email"],
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
    examplePattern: "https://example.com",
    icon: FiExternalLink,
    bgColor: "#E8DEEE",
    textColor: "text-black",

  },

  {
    value: "password",
    label: "Password",
    allowedTypes: [ "password"],
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
    examplePattern: "Abc123!@#",
    icon: FiLock,
    bgColor: "#E8DEEE",
    textColor: "text-black",

  },
];
const filetypealow = [".pdf", ".txt", ".png", ".jpg", ".png", ".doc", ".docx", ".xlsx", ".pptx" ];

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
const logoHeadingTitle = [
  {
    value: "logo",
    label: "Logo",
    bgColor: "#FFF4E6", 
    textColor: "text-gray-800", 
    icon: FiImage, 
  },
  {
    value: "headingTitle",
    label: "headingTitle",
    bgColor: "#E6F7FF", 
    textColor: "text-gray-800", 
    icon: FiBold, 
  },
]
const lnaguageGenerator = [
  {
    value: "ReactJs",
    label: "ReactJs",
    bgColor: "#F0F5FF", 
    textColor: "text-gray-800", 
    icon: FaReact,
  },  {
    value: "NextJs",
    label: "NextJs",
    bgColor: "#F0F5FF", 
    textColor: "text-gray-800", 
    icon: TbBrandNextjs,
  },  {
    value: "Flutter",
    label: "Flutter",
    bgColor: "#F0F5FF", 
    textColor: "text-gray-800", 
    icon: SiFlutter,
  }, {
    value: "Html5",
    label: "Html5",
    bgColor: "#F0F5FF", 
    textColor: "text-gray-800", 
    icon: SiHtml5,
  },
  
]
const inputTypeOptions: InputTypeList[] = [
  {
    value: "text",
    label: "Text",
    bgColor: "#FFF4E6", 
    textColor: "text-gray-800", 
    icon: FiType,
  },
  {
    value: "number",
    label: "Number",
    bgColor: "#F0FFF4", 
    textColor: "text-gray-800", 
    icon: FiHash,
  },
  {
    value: "email",
    label: "Email",
    bgColor: "#E6F0FF", 
    textColor: "text-gray-800", 
    icon: FiMail,
  },
  {
    value: "password",
    label: "Password",
    bgColor: "#F3E8FF", 
    textColor: "text-gray-800", 
    icon: FiLock,
  },
  {
    value: "textarea",
    label: "Textarea",
    bgColor: "#FFE6E6", 
    textColor: "text-gray-800", 
    icon: FiAlignLeft,
  },
  {
    value: "url",
    label: "URL",
    bgColor: "#E6F7FF", 
    textColor: "text-gray-800", 
    icon: FiExternalLink,
  },  {
    value: "file",
    label: "File",
    bgColor: "#E6FFFA", 
    textColor: "text-gray-800", 
    icon: FiFile,
  },
];
const dateInputs : InputTypeList[] = [
    {
    value: "time",
    label: "Time",
    bgColor: "#FFFBE6", 
    textColor: "text-gray-800", 
    icon: FiDatabase,
  },
  {
    value: "date",
    label: "Date",
    bgColor: "#F0F5FF", 
    textColor: "text-gray-800", 
    icon: FiDatabase,
  },
  {
    value: "datetime-local",
    label: "Date with time",
    bgColor: "#F0F5FF", 
    textColor: "text-gray-800", 
    icon: FiDatabase,
  },
]
const otherTypes : InputTypeList[] = [

  {
    value: "paragraph",
    label: "paragraph",
    bgColor: "#E6F7FF", 
    textColor: "text-gray-800", 
    icon: FiBold, 
  }, 
]
const shortcuts = [
  { shortcut: "CTRL+S", title: "Save diagram", description: " Ctrl + S - Save diagram " },
];

export { patternOptions, dateInputs,
  otherTypes,lnaguageGenerator,logoHeadingTitle,selectTypeOptions, dateliment,inputTypeOptions, shortcuts ,filetypealow};
