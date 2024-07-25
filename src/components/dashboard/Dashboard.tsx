"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Form, Input, Modal, message } from "antd";
import PreviewForm from "@/components/forms/previews/PreviewForm";
import { elementsData } from "@/data/data";
import { DeleteFormById, GetFormById } from "@/utils/utilsFunctions";
import { Badge } from "../ui/badge";

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPreviewVisible, setIsModalPreviewVisible] = useState(false);
  const [elements, setElements] = useState<Form []>([]);
  const [lastId, setLastId] = useState(elements.length);
  const [form, setForm] = useState<Form>( );

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch("/api/forms");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setElements(data.forms);
    } catch (error) {
      console.error("Error fetching forms:", error);
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
    elementsData.push({
      content: [],
      description: values.description,
      title: values.title,
      id: lastId + 1,
    });
    setLastId(lastId + 1);
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
  };

  const fetchForm = async (id: number) => {
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
      return null;
    }
  };

  const deleteForm = async (id: number) => {
    try {
      const response = await fetch(`/api/forms/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
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
  };

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col rounded-lg border-2 border-black p-4">
          <div className="flex justify-center mb-4">
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              + Create New Form
            </Button>
          </div>
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
                  <Badge
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteForm(element.id);
                    }}
                    className="bg-red-500  h-7 p-4 text-white font-bold"
                  >
                    Delete
                  </Badge>

                  <Badge
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="bg-yellow-500  h-7 p-4 text-white font-bold"
                  >
                    <Link href={`/forms/${element.id}`}>Edit</Link>
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
