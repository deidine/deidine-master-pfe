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
  FiDollarSign,
} from "react-icons/fi";
import { FaReact } from "react-icons/fa6";
import { SiFlutter } from "react-icons/si";
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
    examplePattern: "https://www.example.com",
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
const lnaguageGenerator = [
  {
    value: "ReactJs",
    label: "ReactJs",
    bgColor: "#F0F5FF", // Light lavender
    textColor: "text-gray-800", // Dark gray
    icon: FaReact,
  },  {
    value: "NextJs",
    label: "NextJs",
    bgColor: "#F0F5FF", // Light lavender
    textColor: "text-gray-800", // Dark gray
    icon: TbBrandNextjs,
  },  {
    value: "Flutter",
    label: "Flutter",
    bgColor: "#F0F5FF", // Light lavender
    textColor: "text-gray-800", // Dark gray
    icon: SiFlutter,
  },
]
const inputTypeOptions: InputTypeList[] = [
  {
    value: "text",
    label: "Text",
    bgColor: "#FFF4E6", // Soft peach
    textColor: "text-gray-800", // Dark gray
    icon: FiType,
  },
  {
    value: "url",
    label: "URL",
    bgColor: "#E6F7FF", // Light blue
    textColor: "text-gray-800", // Dark gray
    icon: FiExternalLink,
  },
  {
    value: "file",
    label: "File",
    bgColor: "#E6FFFA", // Light teal
    textColor: "text-gray-800", // Dark gray
    icon: FiFile,
  },
  {
    value: "time",
    label: "Time",
    bgColor: "#FFFBE6", // Light yellow
    textColor: "text-gray-800", // Dark gray
    icon: FiDatabase,
  },
  {
    value: "date",
    label: "Date",
    bgColor: "#F0F5FF", // Light lavender
    textColor: "text-gray-800", // Dark gray
    icon: FiDatabase,
  },
  {
    value: "datetime-local",
    label: "Date with time",
    bgColor: "#F0F5FF", // Light lavender (same as Date)
    textColor: "text-gray-800", // Dark gray
    icon: FiDatabase,
  },
  {
    value: "number",
    label: "Number",
    bgColor: "#F0FFF4", // Light mint
    textColor: "text-gray-800", // Dark gray
    icon: FiHash,
  },
  {
    value: "email",
    label: "Email",
    bgColor: "#E6F0FF", // Light blue-gray
    textColor: "text-gray-800", // Dark gray
    icon: FiMail,
  },
  {
    value: "password",
    label: "Password",
    bgColor: "#F3E8FF", // Soft purple
    textColor: "text-gray-800", // Dark gray
    icon: FiLock,
  },
  {
    value: "textarea",
    label: "Textarea",
    bgColor: "#FFE6E6", // Soft pink
    textColor: "text-gray-800", // Dark gray
    icon: FiAlignLeft,
  },
];

const shortcuts = [
  { shortcut: "CTRL+S", title: "Save diagram", description: " Ctrl + S - Save diagram " },
];

export { patternOptions, lnaguageGenerator,selectTypeOptions, dateliment,inputTypeOptions, shortcuts ,filetypealow};
