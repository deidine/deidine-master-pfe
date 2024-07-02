type InputElement = BaseElement & {
  type: "text" | "number" | "email" | "password" | "textarea";
  options?: string[]; // Options may exist for future extensibility but are not typically used in InputElement
};
