type SubmissionStats= {
  total: number;
  unread: number;
}

type SoumissionFormulaire ={
  id: number;
  form_id: number;
  user_id: string;
  submission_data: {
    [key: string]: string | string[];
  };
  created_at: string;
  viewed?: boolean;
}

type Form= {
  id :number 
  title :string ;
  description:string;
  content:FormElement[]; 
  isFromLocalStorage?:boolean;
  style?:FormStyle;
  elementStyle?:FormStyle;
  buttonStyle?:FormStyle;
  paragraphStyle?:FormStyle;
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
  rowInputs?: number;
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
 headingLogFlex?:string
 headingLogGap?:number
 headingLogJustify?:string
headingTitle?:string
heightDivider?:number
};
 
type ElementType= "select"|"radio"|"checkbox"|"select_multiple" | "text" |"datetime-local"| "textarea" | "password"|"email"| "number"|"date"|"time"|"file"|"url"| "logo" | "paragraph"|"headingTitle"|"divider" ;

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
 