"use client";
import React, { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import FormTamplate from "./FormTamplate";

export default function ModelForm({
  isModalVisible,
  isAdd,
  setIsModalVisible,
  handleCancel,
  handleOk,
  onFinish,
  initialValues,
}: {
  isAdd: boolean;
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onFinish: (values: any) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
  initialValues?: any; // This will hold the values to edit
}) { 
  const [createform] = Form.useForm();

  // Prefill the form fields if editing
  useEffect(() => {
    if (!isAdd && initialValues) {
      createform.setFieldsValue(initialValues);
    }
  }, [isAdd, initialValues, createform]);

  const onSubmit = (values: any) => {
    onFinish(values);
    createform.resetFields();
    setIsModalVisible(false);
  };

  const handleOkAction = () => {
    handleOk();
  };

  const handleCancelAction = () => {
    handleCancel();
  };

  return (
    <>
      <Modal
        title={isAdd ? "Créer un nouveau formulaire" : "Modifier formulaire"}
        visible={isModalVisible}
        onOk={handleOkAction}
        onCancel={handleCancelAction}
        footer={
null        }
      >
        <Form onFinish={onSubmit} form={createform} layout="vertical">
          <Form.Item
            label="Titre"
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
              {isAdd ? "Créer" : "Modifier"}
            </Button>
          </Form.Item>
        </Form>
          {/* <FormTamplate /> */}

      </Modal>
    </>
  );
}
