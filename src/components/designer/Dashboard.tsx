"use client";
import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Modal } from "antd";
import CardForm from "./CardForm";
import { openNotification } from "@/utils/utils";
import useGeneral from "@/hooks/useGeneral";
import Link from "next/link";

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isUserOnline, setIsUserOnline } = useGeneral();
  const [elements, setElements] = useState<Form[]>([]);
  const [elementsLocalStorage, setElementsLocalStorage] = useState<Form[]>([]);
  const [createform] = Form.useForm();
  const { user } = useGeneral();

  const userId = user?.id;

  useEffect(() => {
    fetchForms();
  }, [isUserOnline]);

  const fetchForms = async () => {
    try {
      let dataForms = [];
      if (isUserOnline) {
        const response = await fetch(`/api/forms?user_id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.forms)) {
          throw new Error("API response is not an array");
        }

        dataForms = data.forms;
      }

      const localStorageForms = JSON.parse(
        localStorage.getItem("forms") || "[]"
      );
      const combinedForms = [...dataForms, ...localStorageForms];
      setElements(dataForms);
      setElementsLocalStorage(localStorageForms);
    } catch (error) {
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      openNotification(
        "topRight",
        "error",
        "Error fetching database forms:",
        ""
      );
      setIsUserOnline(false);
      setElementsLocalStorage(forms);
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
    await handleSave(values.TitleForm, values.description);
    fetchForms();
  };

  const saveToLocalStorage = (title: string, description: string) => {
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    forms.push({
      id: Date.now(),
      title: title,
      content: [],
      isFromLocalStorage: true,
      description: description,
    });
    localStorage.setItem("forms", JSON.stringify(forms));
    openNotification(
      "topRight",
      "success",
      "Data inserted",
      "Data inserted successfully in local storage"
    );
    setIsModalVisible(false);
    createform.resetFields();
  };
  const handleSave = async (title: string, description: string) => {
    if (!isUserOnline) {
      saveToLocalStorage(title, description);
      return;
    } else {
      setIsUserOnline(true);
    }

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
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data inserted:", data);
      setIsModalVisible(false);
      createform.resetFields();
      openNotification(
        "topRight",
        "success",
        "Data inserted",
        "Data inserted successfully in database"
      );
    } catch (error) {
      saveToLocalStorage(title, description);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div  >
        <div className="w-full flex justify-end px-[2.5rem] pt-[1rem] items-end">
          <div className="flex gap-4">
            <button
              className="btn_header bg-blue-400"
              onClick={() => setIsModalVisible(true)}
            >
              Create New Form
            </button>
            <button
              className="btn_header bg-blue-400"
              onClick={() => setIsModalVisible(true)}
            >
              Create New Form
            </button>
          </div>
        </div> 
        <div className="flex  flex-col justify-between gap-4 rounded-lg border-2  p-4">
          {elementsLocalStorage.length > 0 && (
            <p className="text-[25px]  px-[2.5rem]  mb-4">Forms from Local Storage</p>
          )}{" "}
          <div className="flex  px-[2.5rem]  flex-wrap  gap-[2rem]">
            {elementsLocalStorage.map((element) => (
               <Link  onClick={(e) => e.stopPropagation()} 
               href={`/forms/${element.id}?local=${element.isFromLocalStorage ? "true" : "false"}`}
             >
             <CardForm
                reftchForm={fetchForms}
                form={element}
                key={element.id}
              />
              </Link>
            ))}
          </div>
          <Divider  className="py-2 w-full"/>
          {/* <span></span> */}
          {elements.length > 0 && (
            <p  className="text-[25px]  px-[2.5rem]  mb-4">Forms from Database</p>
          )}{" "}
          <div className="flex  px-[2.5rem]  flex-wrap  gap-[2rem]">
          {elements.map((element) => (
              <Link  onClick={(e) => e.stopPropagation()} 
              href={`/forms/${element.id}?local=${element.isFromLocalStorage ? "true" : "false"}`}
            >   <CardForm
                form={element}
                key={element.id}
                reftchForm={fetchForms}
              /></Link>
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
