export const generateComponentCodeHTML = (
  elements: FormElement[],
  submitBtn: string,
  getFormStyles?: FormStyle,
  getInputStyles?: FormStyle,
  getButtonStyles?: FormStyle,
  paragraphStyles?: FormStyle
) => {
  const logoElement = elements.find(
    (element) => element.elementType.type === "logo"
  );
  const HeadTitleElement = elements.find(
    (element) => element.elementType.type === "headingTitle"
  );

  // Convert camelCase to kebab-case
  const toKebabCase = (str: string) => {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  };

  // Filter and format styles as kebab-case strings
  const filterStyles = (styleObject: Record<string, any>) => {
    return Object.entries(styleObject)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${toKebabCase(key)}: ${value}`)
      .join("; ");
  };

  // Default input styles
  const getFormStylesHTML = `height: 2.5rem; font-size: 0.875rem; outline: none; box-shadow: 0 0 0 2px rgba(129, 140, 248, 1); background-color: white; border-color: #e4e4e7; transition-duration: 0.1s; box-shadow: 0 0 0 2px transparent; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); padding-top: 0.5rem; padding-bottom: 0.5rem; padding-left: 0.75rem; padding-right: 0.75rem; width: 100%; border-radius: 0.5rem; border-width: 1px; ::placeholder { color: #a1a1aa; }`;

  // Style strings
  const formStyleString = filterStyles(getFormStyles || {});
  const inputStyleString = filterStyles(getInputStyles || {});
  const logoStyleString = filterStyles(getInputStyles || {});
  const paragraphStyleString = filterStyles(paragraphStyles || {});

  // Generate HTML for different elements
  const componentCode = elements
    .filter(
      (element) =>
        element.elementType.type !== "logo" &&
        element.elementType.type !== "headingTitle"
    )
    .map((input) => {
      let inputElement = "";

      switch (input.elementType.type) {
        case "text":
        case "number":
        case "email":
        case "password":
        case "file":
          inputElement = `<input style="${
            getFormStylesHTML + inputStyleString
          }" type="${input.elementType.type}" placeholder="${
            input.elementType.placeholder
          }" />`;
          break;

        case "url":
          inputElement = `<input style="${
            getFormStylesHTML + inputStyleString
          }" type="text" placeholder="${input.elementType.placeholder}" />`;
          break;

        case "textarea":
          inputElement = `<textarea style="${
            getFormStylesHTML + inputStyleString
          }" placeholder="${input.elementType.placeholder}"></textarea>`;
          break;

        case "date":
          inputElement = `<input style="${
            getFormStylesHTML + inputStyleString
          }" type="date" placeholder="${input.elementType.placeholder}" />`;
          break;

        case "time":
          inputElement = `<input style="${
            getFormStylesHTML + inputStyleString
          }" type="time" placeholder="${input.elementType.placeholder}" />`;
          break;

        case "select":
        case "select_multiple":
          inputElement = `
            <select style="${getFormStylesHTML + inputStyleString}" ${
            input.elementType.type === "select_multiple" ? "multiple" : ""
          }>
              ${input.elementType.options
                ?.map(
                  (option) => `<option value="${option}">${option}</option>`
                )
                .join("\n")}
            </select>`;
          break;

        case "checkbox":
          inputElement = input.elementType
            .options!?.map(
              (option) =>
                `<label><input style="${inputStyleString}" type="checkbox" name="${input.elementType.name}" value="${option}" /> ${option}</label>`
            )
            .join("<br />");
          break;

        case "radio":
          inputElement = input.elementType
            .options!?.map(
              (option) =>
                `<label><input style="${inputStyleString}" type="radio" name="${input.elementType.name}" value="${option}" /> ${option}</label>`
            )
            .join("<br />");
          break;

        case "paragraph":
          inputElement = `<p style="${paragraphStyleString}">${input.elementType.label}</p>`;
          break;

        case "divider":
          inputElement = `<hr style="height: ${input.elementType.heightDivider}px;    " />`;
          break;

        default:
          break;
      }

      return `
        <div style="margin-bottom: 1rem;">
          ${inputElement}
        </div>`;
    })
    .join("\n");

  const exportCode = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Generated Form</title>
    </head>
    <body>

      <form style="${formStyleString}" action="/api/form" method="POST">
        
           <div style="display: flex; align-items: center; flex-direction: ${
       logoElement?.elementType.headingLogFlex =="row" ? "row" : "column"
     }; justify-content:  ${
       logoElement?.elementType.headingLogJustify
     }; gap: 1rem; align-items: center;">
              <img src="${
                logoElement?.elementType.imgLogoLink
              }" alt="Logo" style="${logoStyleString}; width: 160px; height: 160px;" />
           <div style=" size: 24px; font-weight: bold; text-justify:center">
              <h1>${HeadTitleElement?.elementType.headingTitle}</h1>
            </div>  
            </div> 
          
      ${componentCode}
        <div>
          <button type="submit" style="${filterStyles(
            getButtonStyles || {}
          )}">${submitBtn}</button>
        </div>
      </form>
    </body>
    </html>
  `;

  return exportCode;
};
