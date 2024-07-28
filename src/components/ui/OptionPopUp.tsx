import React, { useState } from "react";
import { Tooltip, Modal, Button } from "antd";
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
  index:number,
  toogleSidBar: () => void;
  isEditingSate: boolean;
  name: string;
  setIsEditingState: () => void;
  removeElement: (name: string) => void; 
}) {
  const [isEditing, setIsEditing] = useState(isEditingSate);
  const { setIsEditFormCard, isEditFormCard ,copyElement,duplicateElement,  selectedElement,  cutElement,   pasteElement, } = useDesigner();
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
        <Badge
        //  onClick={(e: React.MouseEvent) => {
        //   e.stopPropagation();
         
        // }}
          className="hover:text-blue-500 bg-white rounded-md w-auto text-center h-6"
          onClick={showModal}
        >
          <MoreOutlined />
        </Badge>
      </Tooltip>
      <Modal
        title="More Options"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="flex flex-col space-y-2">
          <Button
            icon={<CopyOutlined />}
            onClick={() => {
              selectedElement && copyElement(selectedElement.elementType.name) // Assuming index 0 for demo purposes

              setIsModalVisible(false);
            }}
          >
            Copy
          </Button>
          <Button
            icon={<ScissorOutlined />}
            onClick={() => {
              selectedElement && cutElement(selectedElement.elementType.name)
              setIsModalVisible(false);
            }}
          >
            Cut
          </Button>
          <Button
            icon={<FileOutlined />}
            onClick={() => {
              setIsModalVisible(false);
              selectedElement && duplicateElement(index, selectedElement.elementType.name)
            }}
          >
            Duplicate
          </Button>
          <Button
            icon={<CompassFilled />}
            onClick={() => {
              pasteElement(index)
              setIsModalVisible(false);
            }}
          >
            Paste
          </Button>
        </div>
      </Modal>
    </div>
  );
}
