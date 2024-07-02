
// Union type for all possible form elements
type FormElement = {
  id:string;
     elementType: InputElement | SelectElement;
   };
  
type BaseElement = {
  type: string;
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  style?: string;
  required?: boolean;
  pattern?: string[]; 
};
 
type InputOptions = {
  isPasswordConfirm?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  customPattern?: string;
  max?: number;
  disabled?: boolean;
};

type SelectOptions = { 
  disabled?: boolean;
};
 