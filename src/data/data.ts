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
    { value: "select", label: "Select" },
    { value: "select_multiple", label: "Select Multiple" },
    { value: "radio", label: "Radio" },
    { value: "checkbox", label: "Checkbox" },
  ];
  const inputTypeOptions = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
    { value: "textarea", label: "Textarea" },
    { value: "hidden", label: "Hidden" },
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