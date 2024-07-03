type SelectElement = BaseElement & {
  multiple : boolean;
  type: "select"|"radio"|"checkbox";
  options: string[]; 
};
