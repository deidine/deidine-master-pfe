type SelectElement = BaseElement & {
  multiple : boolean;
  type:SelectElementType;

  options: string[]; 
};
type SelectElementType= "select"|"radio"|"checkbox"|"select_multiple"
