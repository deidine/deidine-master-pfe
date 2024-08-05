type Form= {
  id :number 
  title :string ;
  description:string;
  content:FormElement[]; 
  isFromLocalStorage?:boolean;
  create_at?: Date;
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
  pattern?: string ; 
  allowedEtentions?: string,
  startDate?: string,
  endDate?: string,
 
};
 
type ElementType= "select"|"radio"|"checkbox"|"select_multiple" | "text" |"datetime-local"| "textarea" | "password"|"email"| "number"|"date"|"time"|"file"|"url";

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
 