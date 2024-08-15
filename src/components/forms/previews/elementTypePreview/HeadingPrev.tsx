import React from 'react'

export default function HeadingPrev({
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
    <div>
        <p style={getInputStyles()} className='text-3xl font-bold '>
            {element.elementType.label}
        </p>
    </div>
  )
}
