import Image from 'next/image';

export default function LogoPrev({
  element,
  styleForm,
}: {
  element: FormElement;
  styleForm?: FormStyle;
}) {
  return (
    <div className="w-[50%] flex flex-col justify-center items-center">
      {element.elementType?.imgLogoLink && (
        <div
          style={{
            backgroundColor: styleForm?.backgroundColor,
            borderTopRightRadius: styleForm?.borderRadius,
            borderTopLeftRadius: styleForm?.borderRadius,
          }}
        >
          <Image
            src={element.elementType?.imgLogoLink}
            alt="Logo"
            width={160} // Adjust width as needed
            height={160} // Adjust height as needed
            className="mt-4 mx-auto  "
          />
        </div>
      )}
    </div>
  );
}
