 
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
const newElement = (type: ElementType): FormElement => {
  const baseElement: BaseElement = {
    type: type,
    label:type === "divider" ?  "Diviseur" : "Label",
    name: nameGenerator(),
    placeholder: "Placeholder",
    value: "",
    required: false,
    pattern: "",
  };
  const baseElement2: BaseElement = {
    type: type,
    label: type === "logo" ? "LOGO" : "TITRE",
    name: nameGenerator(),
    placeholder: "",
    value: "",
    required: false,
    pattern: "",
  };
 
  switch (type) {
    case "select":
    case "radio":
    case "checkbox":
    case "select_multiple":
      return {
        elementType: {
          ...baseElement,
          options: ["Option 1", "Option 2"], // Add options for these types
        },
        id: idGenerator(),
      };

    case "headingTitle":
      return {
        elementType: {
          ...baseElement2,
          headingTitle: "Titre de l'en-tête", // Add headingTitle for this type
        },
        id: idGenerator(),

      };

    case "logo":
      return {
        elementType: {
          ...baseElement2,
          imgLogoLink: "https://www.pngkey.com/png/detail/233-2332677_ega-png.png", // Add imgLogoLink for this type
        },
        id: idGenerator(),

      };

    case "divider":
      return {
        elementType: {
          ...baseElement ,
          heightDivider: 10, // Add heightDivider for this type
        },
        id: idGenerator(),
      };

    default:
      return {
        elementType: baseElement,
        id: idGenerator(),
      };
  }
};

export { idGenerator,nameGenerator, renderOptions,newElement}
