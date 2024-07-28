import React, { useState } from "react";
import { Tooltip, Dropdown, Menu, Button } from "antd";
import { DeleteFilled, EditOutlined, MoreOutlined, CopyOutlined, ScissorOutlined, FileOutlined, CompassFilled } from "@ant-design/icons";
import useDesigner from "@/hooks/useDesigner";
import { Badge } from "./badge";
import { FiSidebar } from "react-icons/fi";

export default function OptionPopUp({
  name,
  index,
  removeElement,
  isEditingSate,
  setIsEditingState,
  toogleSidBar,
}: {
  index: number;
  toogleSidBar: () => void;
  isEditingSate: boolean;
  name: string;
  setIsEditingState: () => void;
  removeElement: (name: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(isEditingSate);
  const {
    setIsEditFormCard,
    isEditFormCard,
    copyElement,
    duplicateElement,
    selectedElement,
    cutElement,
    pasteElement,
  } = useDesigner();

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "copy":
        selectedElement && copyElement(selectedElement.elementType.name);
        break;
      case "cut":
        selectedElement && cutElement(selectedElement.elementType.name);
        break;
      case "duplicate":
        selectedElement && duplicateElement(index, selectedElement.elementType.name);
        break;
      case "paste":
        pasteElement(index);
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="copy" icon={<CopyOutlined />}>
        Copy
      </Menu.Item>
      <Menu.Item key="cut" icon={<ScissorOutlined />}>
        Cut
      </Menu.Item>
      <Menu.Item key="duplicate" icon={<FileOutlined />}>
        Duplicate
      </Menu.Item>
      <Menu.Item key="paste" icon={<CompassFilled />}>
        Paste
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="absolute right-4 flex space-x-2 opacity-0 group-hover:opacity-100">
      <Tooltip title="Open side bar">
        <Badge
          className="w-auto text-center h-6 hover:text-green-500 bg-white rounded-md"
          onClick={() => {
            toogleSidBar();
          }}
        >
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
      <Tooltip title="More options">
        <Dropdown overlay={menu} trigger={['click']}>
          <Badge
            className="hover:text-blue-500 bg-white rounded-md w-auto text-center h-6"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
            }}
          >
            <MoreOutlined />
          </Badge>
        </Dropdown>
      </Tooltip>
    </div>
  );
}
