import Image from 'next/image';

export default function LogoPrev({
  element,
  styleForm,
}: {
  element: FormElement;
  styleForm?: FormStyle;
}) {
  return (
    <div  >
      {element.elementType?.imgLogoLink && (
        <div
          style={{
            backgroundColor: styleForm?.backgroundColor,
            borderTopRightRadius: styleForm?.borderRadius,
            borderTopLeftRadius: styleForm?.borderRadius,
          }}
        >
          <img
          
            src={element.elementType?.imgLogoLink}
            alt="Logo"
             className="h-[2.5rem]  "
          />
        </div>
      )}
    </div>
  );
}
