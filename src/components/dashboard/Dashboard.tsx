"use client";
import React, { useState } from "react";
import Link from "next/link";
import { elementsData } from "@/data/data";
import { Button, Form, Input, Modal } from "antd";
import PreviewForm from "@/components/forms/previews/PreviewForm";
import { DeleteFormById, GetFormById } from "@/utils/utilsFunctions";

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPreviwVisible, setIsModalPreviwVisible] = useState(false);
  const [lastId, setLastId] = useState(elementsData.length);
  const [previwId, setPreviwId] = useState(0);
  const [elements, setElements] = useState<FormElement[]>([]);

  const handleOk = () => {
    setIsModalVisible(false);
    
  };
  const handlePreviwOk = () => {
    setIsModalPreviwVisible(false);
    setElements([])
  };
  const handlePreviwCancel = () => {
    setIsModalPreviwVisible(false);
    setElements([])

  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (values: any) => {
    elementsData.push({
      content: [],
      description: values.description,
      title: values.title,
      id: lastId + 1,
    });
    console.log(values.title);
    setLastId(lastId + 1);
  };
  return (
    <>
      <div>
        <div className="flex flex-col rounded-lg border-2  border-black p-4 m-4">
          <div className="flex flex-col mx-auto justify-center rounded-lg p-4 border-black border-2">
            choose template
          </div>
          <div className="flex cursor-pointer flex-col rounded-lg border-2   p-4 m-4">
            {elementsData.map((element, index) => (
              <>
                <div
                  onClick={() => {
                    setIsModalPreviwVisible(!isModalPreviwVisible);
                   
                    setElements(GetFormById(Number(element.id)).content);
                    setPreviwId(element.id);
                  }}
                  className="flex flex-row justify-between rounded-lg border-2 border-red-50  p-4 m-4"
                >
                  <div className="text-xl ">
                    <u>title:</u>
                    <br />
                    {element.title}
                  </div>
                  <div>
                    <u>Description:</u>
                    <br />

                    {element.description}
                  </div>
                  <div className="flex flex-row justify-between gap-2">
                    <Button
                    onClick={(e)=>{
                      e.stopPropagation();
                      DeleteFormById(element.id)
                    }}
                    >delete</Button>

                    <Link href={`/forms/${element.id}`}>
                      <Button>edit</Button>
                    </Link>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <div className="flex mx-auto justify-center">
        <button
          className="rounded-lg p-4 border-black border-2"
          onClick={() => {
            setIsModalVisible(!isModalVisible);
          }}
        >
          + or create empty form{" "}
        </button>
      </div>

      <Modal
        title="new form"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          onFinish={onFinish}
          layout="vertical" // Set the layout to vertical
        >
          <Form.Item label={"titile"} name={"title"}>
            <Input
              style={{ padding: "8px" }}
              type={"text"}
              placeholder={"titile"}
            />
          </Form.Item>
          <Form.Item label={"description"} name={"description"}>
            <Input
              name="description"
              style={{ padding: "8px" }}
              type={"text"}
              placeholder={"description"}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="flex  flex-col justify-between items-center mx-auto font-bold w-1/2"
          >
            Create in supabase deiden
          </Button>
        </Form>
      </Modal>

      <Modal
        title="new form"
        visible={isModalPreviwVisible}
        onOk={handlePreviwOk}
        onCancel={handlePreviwCancel}
      >
        <PreviewForm isTemplate={true} elementsTemplate={elements} />
      </Modal>
    </>
  );
}
