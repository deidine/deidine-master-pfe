type InputElement =InputOptions & BaseElement & {
  type: string;
  options?: string[]; // Options may exist for future extensibility but are not typically used in InputElement
};
