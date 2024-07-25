import { elementsData } from "@/data/data";

 function idGenerator(): string {
    return Math.floor(Math.random() * 10001).toString();
  }
   function nameGenerator(): string {
    return Math.random().toString(36).substring(2, 15) ;

    // return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function GetFormById(id:number):Form{
    const data= elementsData.find((element)=>(
         element.id==id
     ))
 return data!;
 }

 function DeleteFormById(id:number):Form[]{
    const data= elementsData.filter(
        (element)=>(
         element.id==id
     ))
 return data!;
 }

 const renderOptions = (type: ElementType) => {
  
  const renderElement: FormElement = {
    elementType: {
      type: type,
      label: "",
      name: nameGenerator(),
      placeholder: "placholder",
      value: "",
      required: false,
      pattern: [],
      style: `h-10 text-sm focus-visible:outline-none focus-visible:ring-2
             focus-visible:bg-white border-zinc-200 duration-100 placeholder:text-zinc-400 ring-2 
             ring-transparent focus:bg-white focus-visible:ring-indigo-400 shadow-sm py-2 px-3 w-full
              rounded-lg border `,
      ...((type === "select" && {
        options: ["Option 1", "Option 2"],
      }) ||
        (type === "radio" && { options: ["Option 1", "Option 2"] }) ||
        (type === "checkbox" && {
          options: ["Option 1", "Option 2"],
        }) ||
        (type === "select_multiple" && {
          options: ["Option 1", "Option 2"],
        })),
    },
    id: idGenerator(),
  };
  return [renderElement];
}
const newElement = (type: ElementType) => {
   const renderElement: FormElement = {
     elementType: {
       type: type,
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
       ...((type === "select" && {
         options: ["Option 1", "Option 2"],
       }) ||
         (type === "radio" && { options: ["Option 1", "Option 2"] }) ||
         (type === "checkbox" && {
           options: ["Option 1", "Option 2"],
         }) ||
         (type === "select_multiple" && {
           options: ["Option 1", "Option 2"],
         })),
     },
     id: idGenerator(),
   };
   return renderElement;
 }
export { idGenerator,nameGenerator,GetFormById,DeleteFormById ,renderOptions,newElement}
