import useDesigner from "@/hooks/useDesigner";
import OptionPopUp from "../../builders/OptionPopUp";

export default function BannerPrev({
  element,
  styleForm,
}: {
  element: FormElement;
  styleForm?: FormStyle;
}) {
 const {removeElement,
  setIsSidebarVisible,
isSidebarVisible
 }=useDesigner()
  return (
   <>
{element.elementType?.imgBannerLink && <><div
    className="max-w-2xl mt-3 bg-white  flex  relative justify-between  group  border w-1/2 mb-[-13px] h-auto"
        
      style={{  
        backgroundColor: styleForm?.backgroundColor ,
        borderTopRightRadius: styleForm?.borderRadius ,
        borderTopLeftRadius: styleForm?.borderRadius ,
    
      }}
    >
          <div className="flex flex-col space-y-3   flex-1">
         
         <OptionPopUp
           form={element}
           name={element.elementType.name}
           removeElement={(name: string) => {
             removeElement(name);
           }}
           toogleSidBar={() => {
             setIsSidebarVisible(!isSidebarVisible);
           }}
         />
       </div>
      <img
        src={element.elementType?.imgBannerLink || "/path/to/default-banner.png"}
        alt="Banner"
        style={{
          width: "100%",
          height: "300px",
          borderTopRightRadius: styleForm?.borderRadius ,
          borderTopLeftRadius: styleForm?.borderRadius ,
        }}
      />
    </div>

    </>
    }
   </>
  );
}
