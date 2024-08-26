 
 function idGenerator(): string {
    return Math.floor(Math.random() * 10001).toString();
  }
   function nameGenerator(): string {
    return Math.random().toString(36).substring(2, 15) ;

    // return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
      pattern: "",
      style: `h-10   rounded-lg border `,
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
       placeholder: "Placeholder",
       value: "",
       required: false,
       pattern: "",
       style: `h-10 rounded-lg border `,
       ...((type === "select" && {
         options: ["Option 1", "Option 2"],
       }) ||
         (type === "radio" && { options: ["Option 1", "Option 2"] }) ||
         (type === "checkbox" && {
           options: ["Option 1", "Option 2"],
         }) ||
         (type === "select_multiple" && {
           options: ["Option 1", "Option 2"],
         })) 
         || (type=== "headingTitle" && {
          headingTitle: "Titre de l'en-tête"})
 ||
 (type === "logo" && {
  imgLogoLink: "https://www.pngkey.com/png/detail/233-2332677_ega-png.png",
 })
     },
     id: idGenerator(),
   };
   return renderElement;
   
 }
export { idGenerator,nameGenerator, renderOptions,newElement}
