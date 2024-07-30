// /pages/Dashboard.js
"use client"; 
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Form, Input, Modal, message } from "antd";
import PreviewForm from "@/components/forms/previews/PreviewForm";
import { Badge } from "../ui/badge";

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPreviewVisible, setIsModalPreviewVisible] = useState(false);
  const [elements, setElements] = useState<Form[]>([]);

  const [_, setForm] = useState<Form>();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  const uud = user?.id; 
  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    if (user) {
      try {
        let dataForms = [];
        const response = await fetch(`/api/forms?user_id=${uud}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        dataForms = data.forms;

        const localStorageForms = JSON.parse(
          localStorage.getItem("forms") || "[]"
        );
        const combinedForms = [...dataForms, ...localStorageForms];
        setElements(combinedForms);
      } catch (error) {
        const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        setElements(forms);
        console.error("Error fetching forms:", error);
      }
    } else {
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      setElements(forms);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handlePreviewOk = () => {
    setIsModalPreviewVisible(false);
    setElements([]);
  };

  const handlePreviewCancel = () => {
    setIsModalPreviewVisible(false);
    setElements([]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values: any) => {
    await handleSave(values.title, values.description);
    fetchForms();
  };

  const handleSave = async (title: string, description: string) => {
    if (user) {
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

        if (!response.ok) {
          throw new Error("Error inserting data");
        }

        const data = await response.json();
        console.log("Data inserted:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      forms.push({
        id: Date.now(), // unique ID for local storage
        title: title,
        content: [],
        isFromLocalStorage: true,
        description: description,
      });
      localStorage.setItem("forms", JSON.stringify(forms));
    }
  };

  const fetchForm = async (id: number) => {
    if (user) {
      try {
        const response = await fetch(`/api/forms/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setForm(data.form);
        return data.form;
      } catch (error) {
        console.error("Error fetching form:", error);
        const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        const form = forms.find((form: Form) => form.id === id);
        setForm(form);
        return null;
      }
    } else {
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      const form = forms.find((form: Form) => form.id === id);
      setForm(form);
      return form;
    }
  };

  const deleteForm = async (id: number) => {
    if (user) {
      try {
        const response = await fetch(`/api/forms/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error deleting form");
        }

        message.success("Form deleted successfully");
        fetchForms();
      } catch (error) {
        console.error("Error deleting form:", error);
        message.error("Error deleting form");
      }
    } else {
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      const updatedForms = forms.filter((form: Form) => form.id !== id);
      localStorage.setItem("forms", JSON.stringify(updatedForms));
      message.success("Form deleted successfully");
      fetchForms();
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
            {elements.map((element) => (
              <div
                key={element.id}
                onClick={async () => {
                  const form = await fetchForm(element.id);
                  setElements(form ? form.content : []);
                  setIsModalPreviewVisible(true);
                }}
                className="flex flex-col md:flex-row justify-between items-center rounded-lg border-2 border-gray-300 p-4 hover:shadow-md cursor-pointer"
              >
                <div className="text-lg font-semibold">
                  <u>Title:</u> {element.title}
                </div>
                <div className="text-lg">
                  <u>Description:</u> {element.description}
                </div>
                <div className="flex gap-2">
                  {element.isFromLocalStorage && (
                    <Button type="default">save to database</Button>
                  )}
                  <Badge
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteForm(element.id);
                    }}
                    className="bg-red-500 h-7 p-4 text-white font-bold"
                  >
                    Delete
                  </Badge>

                  <Badge
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-yellow-500 h-7 p-4 text-white font-bold"
                  >
                    <Link
                      href={`/forms/${element.id}?localStorage=${
                        element.isFromLocalStorage ? "true" : "false"
                      }`}
                    >
                      Edit
                    </Link>
                  </Badge>
                </div>
              </div>
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
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="Title" name="title" rules={[{ required: true }]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Preview Form"
        visible={isModalPreviewVisible}
        onOk={handlePreviewOk}
        onCancel={handlePreviewCancel}
        footer={null}
      >
        <PreviewForm isTemplate={true} elementsTemplate={elements} />
      </Modal>
    </>
  );
}
