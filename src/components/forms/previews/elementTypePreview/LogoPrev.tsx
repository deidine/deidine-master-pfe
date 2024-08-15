import React from 'react';

export default function LogoPrev({
  element,
  styleForm,
}: {
  element: FormElement;
  styleForm?: FormStyle;
}) {
  return (
    <div
      style={{
        padding: styleForm?.paddingY || '10px',
        textAlign: 'center',
      }}
    >{element.elementType.label}
      <img
        src={element.elementType?.imgLogoLink || '/path/to/default-logo.png'}
        alt="Logo"
        style={{
          maxWidth: '100%',
          height: 'auto',
          margin: '0 auto',
          borderRadius: styleForm?.borderRadius || '8px',
        }}
      />
    </div>
  );
}
