export const generateComponentCodeHTML = (
  elements: FormElement[],
  submitBtn: string,
  getFormStyles?: FormStyle,
  getInputStyles?: FormStyle,
  getButtonStyles?: FormStyle,
  paragraphStyles?: FormStyle,
) => {
  const logoElement = elements.find(
    (element) => element.elementType.type === "logo"
  );
  const HeadTitleElement = elements.find(
    (element) => element.elementType.type === "headingTitle"
  );

  const formStyleString = `
    padding: ${getFormStyles?.padding || '20px'};
    margin: ${getFormStyles?.margin || '0 auto'};
    background-color: ${getFormStyles?.backgroundColor || '#f9f9f9'};
    color: ${getFormStyles?.color || '#333'};
    border: ${getFormStyles?.border || '1px solid #ddd'};
    border-radius: ${getFormStyles?.borderRadius || '8px'};
    max-width: ${getFormStyles?.maxWidth || '500px'};
  `;

  const logoStyleString = `
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  `;

  const inputStyleString = `
    padding: ${getInputStyles?.padding || '10px'};
    border: ${getInputStyles?.border || '1px solid #ccc'};
    border-radius: ${getInputStyles?.borderRadius || '4px'};
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;

  const labelStyleString = `
    color: ${getInputStyles?.color || '#555'};
    font-size: 14px;
    font-weight: bold;
  `;

  const buttonStyleString = `
    padding: ${getButtonStyles?.padding || '12px 24px'};
    background-color: ${getButtonStyles?.backgroundColor || '#007bff'};
    color: ${getButtonStyles?.color || '#fff'};
    border: ${getButtonStyles?.border || 'none'};
    border-radius: ${getButtonStyles?.borderRadius || '4px'};
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  `;

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
          inputElement = `<input style="${inputStyleString}" type="${input.elementType.type}" placeholder="${input.elementType.placeholder}" required />`;
          break;
        case "url":
          inputElement = `<input style="${inputStyleString}" type="text" placeholder="${input.elementType.placeholder}" required />`;
          break;
        case "textarea":
          inputElement = `<textarea style="${inputStyleString}" placeholder="${input.elementType.placeholder}" required></textarea>`;
          break;
        case "date":
          inputElement = `<input style="${inputStyleString}" type="date" placeholder="${input.elementType.placeholder}" required />`;
          break;
        case "time":
          inputElement = `<input style="${inputStyleString}" type="time" placeholder="${input.elementType.placeholder}" required />`;
          break;
        case "select":
        case "select_multiple":
          inputElement = `
            <select style="${inputStyleString}" ${input.elementType.type === "select_multiple" ? 'multiple' : ''}>
              ${input.elementType.options
                ?.map(
                  (option) =>
                    `<option value="${option}">${option}</option>`
                )
                .join('')}
            </select>`;
          break;
        case "checkbox":
          inputElement = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${input.elementType.options
                ?.map(
                  (option) =>
                    `<label><input type="checkbox" value="${option}" style="margin-right: 8px;">${option}</label>`
                )
                .join('')}
            </div>`;
          break;
        case "radio":
          inputElement = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${input.elementType.options
                ?.map(
                  (option) =>
                    `<label><input type="radio" name="${input.elementType.name}" value="${option}" style="margin-right: 8px;">${option}</label>`
                )
                .join('')}
            </div>`;
          break;
        case "paragraph":
          inputElement = `<p style="${paragraphStyles ? Object.entries(paragraphStyles).map(([key, value]) => `${key}: ${value};`).join(' ') : ''}">${input.elementType.label}</p>`;
          break;
        case "divider":
          inputElement = `<hr style="height: ${input.elementType.heightDivider || '1px'}; background-color: #ccc;" />`;
          break;
        default:
          break;
      }

      return `
        <div style="margin-bottom: 16px;">
          ${input.elementType.type !== "paragraph" && input.elementType.type !== "divider" ? `<label style="${labelStyleString}">${input.elementType.label}</label>` : ''}
          ${inputElement}
        </div>`;
    })
    .join('');

  const exportCode = `
    <form style="${formStyleString}" onsubmit="handleSubmit(event)">
      ${logoElement ? `
        <div style="${logoStyleString}">
          <img src="${logoElement.elementType.imgLogoLink}" alt="Logo" style="width: 120px; height: 120px; margin-bottom: 10px;" />
          ${HeadTitleElement ? `<h1 style="font-size: 24px; text-align: center;">${HeadTitleElement.elementType.headingTitle}</h1>` : ''}
        </div>
      ` : ''}
      ${componentCode}
      <div style="text-align: center;">
        <button type="submit" style="${buttonStyleString}">${submitBtn}</button>
      </div>
    </form>

    <script>
      function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());

        fetch('/api/form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formObject),
        })
        .then(response => response.json())
        .then(result => console.log('Form successfully submitted:', result))
        .catch(error => console.error('Error submitting form:', error));
      }
    </script>
  `.trim();

  return exportCode;
};