type Form= {
  id :number 
  title :string ;
  description:string;
  content:FormElement[]; 
  isFromLocalStorage?:boolean;
  style?:FormStyle;
  elementStyle?:FormStyle;
  buttonStyle?:FormStyle;
  styleForm?:FormStyle;
  styleElement?:FormStyle;
  create_at?: Date;
}
type FormStyle  ={
  paddingX?: string;
  paddingY?: string; 
  backgroundColor?: string;
   color?: string;
  border?: string;
  borderRadius?: string;
  boxShadow?: string;
  [key: string]: string | undefined; // To allow any additional CSS properties
};
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
 imgLogoLink?:string
imgBannerLink?:string
};
 
type ElementType= "select"|"radio"|"checkbox"|"select_multiple" | "text" |"datetime-local"| "textarea" | "password"|"email"| "number"|"date"|"time"|"file"|"url"|"logo";

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
 