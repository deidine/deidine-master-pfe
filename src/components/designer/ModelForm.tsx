"use client";
import React, {   useState } from "react";
import { Button, Form, Input, Modal } from "antd";
 
export default function ModelForm({
  isModalVisible,

  isAdd,
  setIsModalVisible,
  handleCancel,
handleOk,
onFinish
}: {
  isAdd: boolean;
  isModalVisible: boolean;
handleOk: () => void;
handleCancel: () => void,
onFinish : (values: any) => void,
  setIsModalVisible: (isModalVisible: boolean) => void;
}) {
  // const [isModalVisible, setIsModalVisible] = useState(false); 
  const [createform] = Form.useForm();
  
   return (
    <>
  
      <Modal
        title="Create New Form"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish} form={createform} layout="vertical">
          <Form.Item
            label="Title"
            name="TitleForm"
            rules={[{ required: true }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: false }]}
          >
            <Input.TextArea className="h-[2.5rem]" placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal> 
    </>
  );
}
