export default function BannerPrev({
  element,
  styleForm,
}: {
  element: FormElement;
  styleForm?: FormStyle;
}) {
  const defaultStyle = { 
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
  };

  return (
    <div
      style={{  
        backgroundColor: styleForm?.backgroundColor || defaultStyle.backgroundColor,
      }}
    >
      <img
        src={element.elementType?.imgBannerLink || "/path/to/default-banner.png"}
        alt="Banner"
        style={{
          width: "100%",
          height: "100px",
          borderRadius: styleForm?.borderRadius || defaultStyle.borderRadius,
        }}
      />
    </div>
  );
}
