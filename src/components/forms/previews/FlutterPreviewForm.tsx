import React, { useState, useEffect } from "react";
import useDesigner from "@/hooks/useDesigner";
import PhoneEmulator from "@/components/designer/PhoneEmulator";

export default function FlutterPreviewForm({
  isTemplate,
  showSubmit,
  elementsTemplate,
}: {
  isTemplate?: boolean;
  showSubmit?: boolean;
  elementsTemplate?: Form[] | FormElement[];
}) {
  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
    setSubmitted(true);
  };
  const [submitted, setSubmitted] = useState(false);
  const [isTemlate, setisTemlate] = useState<boolean>(isTemplate || false);
  const [elementsTemplatePreviw, setElementsTemplatePreviw] = useState<
    Form[] | FormElement[]
  >(elementsTemplate!);
  const { elements, submitBtn } = useDesigner();
  const mapElement = isTemlate ? elementsTemplatePreviw : elements;

  useEffect(() => {
    setElementsTemplatePreviw(elementsTemplate!);
  }, [elementsTemplate]);

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close this page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <PhoneEmulator banDevices={["iPhone 8"] } color="blue" onChange={() => {}}>
   {() => (   <form onSubmit={onFinish} className="p-4">
        {mapElement.map((element: any, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {element.elementType.label}
            </label>
            {["text", "number", "email", "password", "file"].includes(
              element.elementType.type
            ) && (
              <input
                type={element.elementType.type}
                name={element.elementType.name}
                placeholder={element.elementType.placeholder}
                required={element.elementType.required}
                pattern={element.elementType.pattern?.join("|")}
                className="w-full px-3 py-2 border rounded"
              />
            )}
            {element.elementType.type === "textarea" && (
              <textarea
                name={element.elementType.name}
                placeholder={element.elementType.placeholder}
                required={element.elementType.required}
                className="w-full px-3 py-2 border rounded"
              ></textarea>
            )}
            {element.elementType.type === "date" && (
              <input
                type="date"
                name={element.elementType.name}
                placeholder={element.elementType.placeholder}
                required={element.elementType.required}
                className="w-full px-3 py-2 border rounded"
              />
            )}
            {element.elementType.type === "datetime-local" && (
              <input
                type="datetime-local"
                name={element.elementType.name}
                placeholder={element.elementType.placeholder}
                required={element.elementType.required}
                className="w-full px-3 py-2 border rounded"
              />
            )}
            {element.elementType.type === "time" && (
              <input
                type="time"
                name={element.elementType.name}
                placeholder={element.elementType.placeholder}
                required={element.elementType.required}
                className="w-full px-3 py-2 border rounded"
              />
            )}
            {element.elementType.type === "select" && (
              <select
                name={element.elementType.name}
                required={element.elementType.required}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="" disabled selected>
                  {element.elementType.placeholder}
                </option>
                {element.elementType.options.map((option: any, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {element.elementType.type === "select_multiple" && (
              <select
                name={element.elementType.name}
                required={element.elementType.required}
                multiple
                className="w-full px-3 py-2 border rounded"
              >
                <option value="" disabled>
                  {element.elementType.placeholder}
                </option>
                {element.elementType.options.map((option: any, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {element.elementType.type === "checkbox" && (
              <div className="flex flex-col space-y-2">
                {element.elementType.options.map((option: any, idx: number) => (
                  <label key={idx} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name={element.elementType.name}
                      value={option}
                      required={element.elementType.required}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            )}
            {element.elementType.type === "radio" && (
              <div className="flex flex-col space-y-2">
                {element.elementType.options.map((option: any, idx: number) => (
                  <label key={idx} className="inline-flex items-center">
                    <input
                      type="radio"
                      name={element.elementType.name}
                      value={option}
                      required={element.elementType.required}
                      className="form-radio"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex justify-center pt-6">
          {showSubmit ? null : (
            <button
              type="submit"
              className="h-10 font-bold py-2 px-4 w-1/2 bg-blue-600 text-white rounded"
            >
              {submitBtn}
            </button>
          )}
        </div>
      </form> 
     )}
    </PhoneEmulator>
  );
}
