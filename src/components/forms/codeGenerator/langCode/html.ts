export const generateComponentCodeHTML = (
  elements: FormElement[],
  submitBtn: string,
  getFormStyles?: FormStyle,
  getInputStyles?: FormStyle
) => {
  const getFormStylesHTML = `height: 2.5rem;  font-size: 0.875rem;outline: none; box-shadow: 0 0 0 2px rgba(129, 140, 248, 1); background-color: white;  border-color: #e4e4e7; transition-duration: 0.1s;box-shadow: 0 0 0 2px transparent; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);padding-top: 0.5rem; padding-bottom: 0.5rem;padding-left: 0.75rem; padding-right: 0.75rem;width: 100%; border-radius: 0.5rem;border-width: 1px;::placeholder { color: #a1a1aa; }  `;

  // Helper function to convert camelCase to kebab-case
  const toKebabCase = (str: string) => {
    return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  };

  // Helper function to filter out undefined values from a style object and convert to kebab-case
  const filterStyles = (styleObject: Record<string, any>) => {
    return Object.entries(styleObject)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => `${toKebabCase(key)}: ${value}`)
      .join("; ");
  };

  const logoElement = elements.find(
    (element) => element.elementType.type === "logo"
  );
  const HeadTitleElement = elements.find(
    (element) => element.elementType.type === "headingTitle"
  );

  // Use the helper function to generate valid style strings in kebab-case
  const formStyleString = filterStyles(getFormStyles || {});
  const inputStyleString = filterStyles(getInputStyles || {});
  const logoStyleString = filterStyles(getInputStyles || {});
  const HeadTitleStyleString = filterStyles(getInputStyles || {});

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
                        <select style="${
                          getFormStylesHTML + inputStyleString 
                        }" ${
            input.elementType.type === "select_multiple" ? "multiple" : ""
          }>
                            ${input.elementType.options
                              ?.map(
                                (option) =>
                                  `<option value="${option}">${option}</option>`
                              )
                              .join("\n")}
                        </select>`;
          break;
        case "checkbox":
          inputElement = input.elementType
            .options!?.map(
              (option, idx) =>
                `<label><input style="${inputStyleString}" type="checkbox" name="${input.elementType.name}" value="${option}" /> ${option}</label>`
            )
            .join("<br />");
          break;
        case "radio":
          inputElement = input.elementType
            .options!?.map(
              (option, idx) =>
                `<label><input style="${inputStyleString}" type="radio" name="${input.elementType.name}" value="${option}" /> ${option}</label>`
            )
            .join("<br />");
          break;

        default:
          break;
      }

      return `
                <div>
                    <label>${input.elementType.label}</label> <br />
                    ${inputElement}
                </div>`;
    })
    .join("\n");

  const exportCode = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <form style="${formStyleString}" action="/api/form" method="POST">
        <div style="${formStyleString}" style=" display: flex; flex-direction: ${
    logoElement?.elementType.headingLogFlex === "col" ? "column" : "row"
  };">
          ${
            logoElement?.elementType.type === "logo"
              ? `<div><img src="${logoElement.elementType?.imgLogoLink}" alt="Logo" style="${logoStyleString}; width: 160px; height: 160px;" /></div>`
              : ""
          }
          ${
            HeadTitleElement?.elementType.type === "headingTitle"
              ? `<div><span style="${HeadTitleStyleString}; font-size: 24px; font-weight: bold;">${HeadTitleElement.elementType?.headingTitle}</span></div>`
              : ""
          }
        </div>
        ${componentCode}
        <div>
          <button type="submit">${submitBtn}</button>
        </div>
      </form>
    </body>
    </html>
    `.trim();

  return exportCode;
};
