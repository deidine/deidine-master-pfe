export default function LogoPrev({
  element,
  styleForm,
}: {
  element: FormElement;
  styleForm?: FormStyle;
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
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
              alt="Banner"
              className="  mt-4 mx-auto h-40 w-40 rounded-full"
            />
          </div>
 
      )}

   
    </div>
  );
}
