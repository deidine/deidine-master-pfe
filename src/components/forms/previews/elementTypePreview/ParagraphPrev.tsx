import React from 'react'

export default function ParagraphPrev({
    element,
    styleParagraph,
  }: {
    element: FormElement;
    styleParagraph? : FormStyle;
  }) {
    const getInputStyles = () => {
      return {
        paddingLeft: styleParagraph?.paddingX  || '8px',
        paddingRight: styleParagraph?.paddingX  || '8px',
        paddingTop: styleParagraph?.paddingY  || '8px',
        paddingBottom: styleParagraph?.paddingY || '8px',
        color: styleParagraph?.color,  
        fontSize : styleParagraph?.borderRadius|| '20px' , 
        whiteSpace: 'normal' 
      };
    };
  return (
    <div   >
        <p style={{ ...getInputStyles()}} >
            {element.elementType.label}
        </p>
    </div>
  )
}
