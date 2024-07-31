"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button , Form, Input, Modal, message } from "antd";
import PreviewForm from "@/components/forms/previews/PreviewForm";
import { Badge } from "../ui/badge";

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPreviewVisible, setIsModalPreviewVisible] = useState(false);
  const [elements, setElements] = useState<Form[]>([]);
  const [elementsPreview, setElementsPreview] = useState<Form[]>([]);
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")!) : null;
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
      setElements(combinedForms);
    } catch (error) {
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      setElements(forms); 
      console.error("Error fetching forms:", error);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handlePreviewOk = () => {
    setIsModalPreviewVisible(false);
  };

  const handlePreviewCancel = () => {
    setIsModalPreviewVisible(false);
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
   
      console.error("Error:", error);
    }
  };

  const fetchForm = async (id: number) => {
    try {
      const response = await fetch(`/api/forms/${id}`);
      const data = await response.json();
      return data.form;
    } catch (error) {
      console.error("Error fetching form:", error);
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      const form = forms.find((form: Form) => form.id === id);

      return form;
    }
  };

  const deleteForm = async (id: number) => {
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
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      const updatedForms = forms.filter((form: Form) => form.id !== id);
      localStorage.setItem("forms", JSON.stringify(updatedForms));
      forms && message.success("localStorage Form deleted successfully");

      fetchForms();
    }
  };
  const saveToDatabase = async (
    id:number,
    title: string,
    content: FormElement[],
    description: string
  ) => {
    try {
      const response = await fetch("/api/forms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          description: description,
          user_id: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Error inserting data");
      }

      const data = await response.json();
      console.log("Data inserted:", data);
      deleteForm( id);
    } catch (error) {
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
            {elements.map((element) => (
              <div
                key={element.id}
                onClick={async () => {
                  const form = await fetchForm(element.id);
                  setElementsPreview(form ? form.content : []);
                  setIsModalPreviewVisible(true);
                }}
                className="flex flex-col md:flex-row  items-center 
                justify-between
                rounded-lg border-2 border-gray-300 gap-4
                p-4 hover:shadow-md cursor-pointer"
              >
                <div className="flex flex-row gap-3 items-center ">
                  <div className="w-[30px] h-[30px] text-center  rounded-lg border-2">
                    ...
                  </div>
                 

                  <div className="flex flex-col gap-3 text-lg font-semibold">
                    <p className="text-lg"> {element.title}</p>
                   
                    <Badge
                      className={` ${
                        element.isFromLocalStorage
                          ? "bg-[#bccdda70]"
                          : "bg-[#65b1eb70]"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {element.isFromLocalStorage
                        ? "Local Storage"
                        : "Database"}
                    </Badge>
                  </div>
                   {element.create_at?.toDateString()  }
                </div>

                <div className="flex gap-2">
                  {element.isFromLocalStorage && (
                    <Badge
                      onClick={(e) =>
                    { 
                      saveToDatabase( 
                        element.id,
                        element.title,
                        element.content,
                        element.description
                      )
                    }
                      }
                    >
                      save to database
                    </Badge>
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
        <PreviewForm isTemplate={true} elementsTemplate={elementsPreview} />
      </Modal>
    </>
  );
}
