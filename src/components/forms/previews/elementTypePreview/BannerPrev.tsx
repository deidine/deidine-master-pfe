
export default function BannerPrev({
    element,
    styleForm,
  }: {
    element: FormElement;
    styleForm?: FormStyle;
  }) {
    return (
      <div
        style={{
          width: '100%',
          padding: styleForm?.paddingY || '10px',
          backgroundColor: styleForm?.backgroundColor || '#f0f0f0',
          textAlign: 'center',
        }}
      >
        <img
          src={element.elementType?.imgBannerLink || '/path/to/default-banner.png'}
          alt="Banner"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: styleForm?.borderRadius || '8px',
          }}
        />
      </div>
    );
  }
  