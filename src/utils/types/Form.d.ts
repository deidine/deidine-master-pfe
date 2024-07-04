
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
  customPattern?: string;

  pattern?: string[]; 
};
 
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
 