import React from 'react'

export default function HeadingTitlePrev({
    element,
    styleForm,
  }: {
    element: FormElement;
    styleForm?: FormStyle;
  }) {
    const getInputStyles = () => {
      return {
        paddingLeft: styleForm?.paddingX  || '8px',
        paddingRight: styleForm?.paddingX  || '8px',
        paddingTop: styleForm?.paddingY  || '8px',
        paddingBottom: styleForm?.paddingY || '8px',
        color: styleForm?.color, 
        border: styleForm?.border ,
        borderRadius: styleForm?.borderRadius , 
      };
    };
    
  return (
    <div >
        {element.elementType?.headingTitle && (
     
     <div
       style={ getInputStyles() }
     >
       <span className="text-2xl   font-bold">
         {element.elementType?.headingTitle}
       </span>
     </div>

 )}
    </div>
  )
}
