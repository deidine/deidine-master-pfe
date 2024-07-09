import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import {
  DeleteFilled,
  EditOutlined,
  FullscreenExitOutlined,
} from "@ant-design/icons";
import useDesigner from "@/hooks/useDesigner";

export default function OptionPopUp({
  name,
  removeElement, 
  isEditingSate,
  setIsEditingState,
  toogleSidBar,
}: {
  toogleSidBar: () => void;
  isEditingSate: boolean;
  name: string; 
  setIsEditingState: () => void;
  removeElement: (name: string) => void;
}) {

  const [isEditing, setIsEditing] = useState(isEditingSate);
  const { setIsEditFormCard ,isEditFormCard} = useDesigner();

  return (
    <div className="absolute right-4 flex space-x-2 opacity-0 group-hover:opacity-100">
      <Tooltip title="Open side bar">
      <Button
          onClick={() => {
          
            toogleSidBar( );
          }}
          icon={<FullscreenExitOutlined />}
          size="small"
        /> 
      </Tooltip>
      <Tooltip title="Edit Label">
      <Button
        icon={<EditOutlined />}
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
           setIsEditing(!isEditing);
          setIsEditFormCard(!isEditFormCard);
          setIsEditingState(); 

        }}
        size="small"
      />
      </Tooltip>
      <Tooltip title="Delete">
         <Button
         
          onClick={() => {
            removeElement(name);
          }}
          icon={<DeleteFilled   className="hover:text-red-500" />}
          size="small"
        />
             
      </Tooltip>
    </div>
  );
}
