import { nameGenerator, idGenerator } from "@/utils/utilsFunctions";

const patternOptions = [
    { value: "phone", label: "Phone", pattern: "\\d{10}" },
    {
      value: "email",
      label: "Email",
      pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
    },
    // { value: "regex", label: "Custom Regex", pattern: customPattern },
  
  ];

  const selectTypeOptions = [
    { value: "select", label: "Select" ,bgColor:"",textColor:"",icon:""  },
    { value: "select_multiple", label: "Select Multiple" ,bgColor:"",textColor:"",icon:""},
    { value: "radio", label: "Radio" ,bgColor:"",textColor:"",icon:""},
    { value: "checkbox", label: "Checkbox" ,bgColor:"",textColor:"",icon:""},
  ];
  const inputTypeOptions = [
    { value: "text", label: "Text" ,bgColor:"",textColor:"",icon:""},
    { value: "number", label: "Number",bgColor:"",textColor:"",icon:"" },
    { value: "email", label: "Email",bgColor:"",textColor:"",icon:"" },
    { value: "password", label: "Password" ,bgColor:"",textColor:"",icon:""},
    { value: "textarea", label: "Textarea",bgColor:"",textColor:"",icon:"" },
    { value: "hidden", label: "Hidden",bgColor:"",textColor:"",icon:"" },
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