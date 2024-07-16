import { nameGenerator, idGenerator } from "@/utils/utilsFunctions";
import { FiSidebar, FiList, FiRadio, FiCheckSquare, FiType, FiHash, FiMail, FiLock, FiAlignLeft, FiEyeOff } from 'react-icons/fi';

const patternOptions = [
    { value: "phone", label: "Phone", pattern: "\\d{10}" },
    {
      value: "email",
      label: "Email",
      pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    },
    // { value: "regex", label: "Custom Regex", pattern: customPattern },
  
  ];
  const selectTypeOptions  = [
    { value: "select", label: "Select", bgColor: "bg-blue-500", textColor: "text-black", icon: FiSidebar },
    { value: "select_multiple", label: "Select Multiple", bgColor: "bg-green-500", textColor: "text-black", icon: FiList },
    { value: "radio", label: "Radio", bgColor: "bg-red-500", textColor: "text-black", icon: FiRadio },
    { value: "checkbox", label: "Checkbox", bgColor: "bg-yellow-500", textColor: "text-black", icon: FiCheckSquare },
  ];
  
  const inputTypeOptions = [
    { value: "text", label: "Text", bgColor: "bg-green-500", textColor: "text-black", icon: FiType },
    { value: "number", label: "Number", bgColor: "bg-purple-500", textColor: "text-black", icon: FiHash },
    { value: "email", label: "Email", bgColor: "bg-pink-500", textColor: "text-black", icon: FiMail },
    { value: "password", label: "Password", bgColor: "bg-teal-500", textColor: "text-black", icon: FiLock },
    { value: "textarea", label: "Textarea", bgColor: "bg-orange-500", textColor: "text-black", icon: FiAlignLeft },
    
  ];

  const elementsData: Form[] = [
    {
      id: 1,
      title: "deidine1",
      content: [ {
        elementType: {
          type: "text",
          label: "Label",
          name: nameGenerator(),
          placeholder: "Enter your data",
          value: "",
          required: false,
          pattern: [],
          style: `h-10 text-sm focus-visible:outline-none focus-visible:ring-2
             focus-visible:bg-white border-zinc-200 duration-100 placeholder:text-zinc-400 ring-2 
             ring-transparent focus:bg-white focus-visible:ring-indigo-400 shadow-sm py-2 px-3 w-full
              rounded-lg border `,
        },
        id: idGenerator(),
      },
    
      {
        elementType: {
          type: "text",
          label: "Label",
          name: nameGenerator(),
          placeholder: "Enter your data",
          value: "",
          required: false,
          pattern: [],
          style: `h-10 text-sm focus-visible:outline-none focus-visible:ring-2
             focus-visible:bg-white border-zinc-200 duration-100 placeholder:text-zinc-400 ring-2 
             ring-transparent focus:bg-white focus-visible:ring-indigo-400 shadow-sm py-2 px-3 w-full
              rounded-lg border `,
        },
        id: idGenerator(),
      },
    ],
      description: "deidine deidine deidne",
    },
    {
      id: 2,
      title: "deidine2",
      content: [],
      description: "deidine deidine deidne",
    },
    {
      id: 3,
      title: "deidine3",
      content: [],
      description: "deidine deidine deidne",
    },
  ];
export { patternOptions,selectTypeOptions,inputTypeOptions,elementsData }