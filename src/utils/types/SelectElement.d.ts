type SelectElement = BaseElement & {
  type: "select";
  options: string[]; 
  multiple : boolean;
};
