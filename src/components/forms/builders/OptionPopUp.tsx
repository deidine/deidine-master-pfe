import React, { useState } from "react";
import { Tooltip } from "antd";
import {
  DeleteFilled,
  EditOutlined, 
} from "@ant-design/icons";
import useDesigner from "@/hooks/useDesigner";
import { Badge } from "../../ui/badge";
import { FiSidebar } from "react-icons/fi";

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
  const { setIsEditFormCard, isEditFormCard } = useDesigner();

  return (
    <div className="absolute right-4 flex space-x-2 opacity-0 group-hover:opacity-100">
      <Tooltip title="Open side bar">
        <Badge
          className="w-auto text-center h-6 hover:text-green-500 bg-white rounded-md"
          onClick={() => {
            toogleSidBar();
          }}
        >
          {" "}
          <FiSidebar />
        </Badge>
      </Tooltip>
      <Tooltip title="Edit Label">
        <Badge
          className="w-auto text-center hover:text-yellow-500 h-6 bg-white rounded-md"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
            setIsEditFormCard(!isEditFormCard);
            setIsEditingState();
          }}
        >
          <EditOutlined />
        </Badge>
      </Tooltip>
      <Tooltip title="Delete">
        <Badge
          className="hover:text-red-500 bg-white rounded-md w-auto text-center h-6"
          onClick={() => {
            removeElement(name);
          }}
        >
          <DeleteFilled />
        </Badge>
      </Tooltip>
    </div>
  );
}