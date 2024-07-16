type Form= {
  id :number 
  title :string ;
  description:string;
  content:FormElement[]; 
}

type FormElement = {
  id:string;
  elementType: InputElement | SelectElement;
 
};
  
type BaseElement = {
  type:ElementType;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  style?: string;
  required?: boolean;
  customPattern?: string; 
  pattern?: string[]; 
};
 
type ElementType= "select"|"radio"|"checkbox"|"select_multiple" | "text" | "textarea" | "password"|"email"| "number"|"date"|"time"|"file";

type InputOptions = {
  isPasswordConfirm?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
};

type SelectOptions = { 
  disabled?: boolean;
};
 