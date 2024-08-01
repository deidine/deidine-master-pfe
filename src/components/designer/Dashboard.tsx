"use client";
import React, { useEffect, useState } from "react";

import { Button, Form, Input, Modal } from "antd";
import CardForm from "./CardForm";
import { openNotification  } from "@/utils/utils";

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [elements, setElements] = useState<Form[]>([]);
  const [elementsLocalstrage, setElementsLocalstrage] = useState<Form[]>([]);
  const [createform] = Form.useForm();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")!)
      : null;
  const uud = user?.id;

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      let dataForms = [];
      const response = await fetch(`/api/forms?user_id=${uud}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      dataForms = data.forms;
      const localStorageForms = JSON.parse(
        localStorage.getItem("forms") || "[]"
      );
      const combinedForms = [...dataForms, ...localStorageForms];
      setElements(dataForms);
      setElementsLocalstrage(localStorageForms);
    } catch (error) {
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      openNotification("bottomRight",'error',"Error fetching database forms :", ""+error);

      setElementsLocalstrage(forms);
      console.error("Error fetching forms:", error);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  
  const onFinish = async (values: any) => {
    await handleSave(values.title, values.description);
  
    fetchForms();
  };

  const handleSave = async (title: string, description: string) => {
    try {
      const response = await fetch("/api/forms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: [],
          description: description,
          user_id: user.id,
        }),
      });
      const data = await response.json();
      console.log("Data inserted:", data);
      setIsModalVisible(false);
      createform.resetFields();
      openNotification("topRight",'success',"Data inserted:", "Data inserted successfully in database");
    } catch (error) {
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      forms.push({
        id: Date.now(),
        title: title,
        content: [],
        isFromLocalStorage: true,
        description: description,
      });
      localStorage.setItem("forms", JSON.stringify(forms));
      openNotification("topRight",'success',"Data inserted:", "Data inserted successfully in localstorage");
      setIsModalVisible(false);
      createform.resetFields();
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            + Create New Form
          </Button>
        </div>
        <div className="flex justify-center mb-4"></div>
        <div className="flex flex-col rounded-lg border-2 border-black p-4">
          <div className="flex flex-col gap-4">
            
          {elements.length > 0 && <h2>  forms from database</h2>}

            {elements.map((element) => (
              <CardForm
                form={element}
                key={element.id}
                reftchForm={() => {
                  fetchForms();
                }}
              />
            ))}
          {elementsLocalstrage.length > 0 && <h2>  forms from localStorage</h2>}
            {elementsLocalstrage.map((element) => (
              <CardForm
                reftchForm={() => {
                  fetchForms();
                }}
                form={element}
                key={element.id}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal
        title="Create New Form"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={onFinish} form={createform} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
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
