"use client";
import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Modal } from "antd";
import PreviewForm from "../forms/previews/PreviewForm";
import Link from "next/link";
import { CiCircleCheck } from "react-icons/ci";
import { openNotification, saveToDatabase } from "@/utils/utils";
import useGeneral from "@/hooks/useGeneral";
import { CiCircleInfo } from "react-icons/ci";
import { MdMoreHoriz } from "react-icons/md";
export default function CardForm({
  form,
  reftchForm,
}: {
  form: Form;
  reftchForm: () => void;
}) {
  const [isModalPreviewVisible, setIsModalPreviewVisible] = useState(false);
  const { isUserOnline, user } = useGeneral();

  const [elementsPreview, setElementsPreview] = useState<Form[]>([]);

  useEffect(() => {}, []);

  const fetchForm = async (id: number) => {
    try {
      if (isUserOnline) {
        const response = await fetch(`/api/forms/${id}`);
        const data = await response.json();
        return data.form;
      } else {
        const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        const form = forms.find((form: Form) => form.id === id);
        return form;
      }
    } catch (error) {
      console.error("Error fetching form:", error);
      openNotification(
        "topRight",
        "error",
        "Error fetching database forms :",
        "" + error
      );

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
      reftchForm();
      if (!response.ok) {
        throw new Error("Error deleting form");
      }
      openNotification(
        "topRight",
        "success",
        "Form deleted successfully",
        "Form deleted successfully from database"
      );
    } catch (error) {
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      const updatedForms = forms.filter((form: Form) => form.id !== id);
      localStorage.setItem("forms", JSON.stringify(updatedForms));
      updatedForms[0].isFromLocalStorage &&
        openNotification(
          "topRight",
          "success",
          "Form deleted successfully",
          "Form deleted successfully from Localstorage"
        );
      // !updatedForms[0].isFromLocalStorage &&    openNotificationErro("topRight","Error Deleting  forms :", ""+error);
    }
  };
  const handlePreviewOk = () => {
    setIsModalPreviewVisible(false);
  };

  const handlePreviewCancel = () => {
    setIsModalPreviewVisible(false);
  };

  return (
    <div>
      <div
        key={form.id}
        onClick={async () => {
          const form2 = await fetchForm(form.id);
          setElementsPreview(form2 ? form2.content : []);
          setIsModalPreviewVisible(true);
        }}
        className="rounded-[15px] relative bg-white border-2 p-4 w-[400px] h-[200px] cursor-pointer "
      >
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="text-3xl flex flex-row justify-between items-center gap-4">
            {" "}
      {form.isFromLocalStorage ?   <CiCircleInfo /> : <CiCircleCheck/>}  <p className="text-lg"> {form.title}</p>
          </div>{" "}
          <button className=" mb-[18px] mr-[18px]" ><MdMoreHoriz/></button>
        </div>

        <p className="text-lg mt-4"> {form.description}</p>
        <div className="  absolute  text-white right-0 mb-[18px] mr-[18px] bottom-0 ">
          {form.isFromLocalStorage && user && (
            <Badge
            className=" bg-[#B5B5B5] h-7 font-semibold rounded-[20px] shadow-lg  p-4 text-white "
              onClick={(e) => {
                saveToDatabase(
                  form.title,
                  form.content,
                  form.description,
                  false,
                  user.id
                );
                deleteForm(form.id);
              }}
            >
              Syncoronise avec base de donnée
            </Badge>
          )}
        </div>
      </div>
      {form.create_at?.toDateString()}

      <Modal
        title="Preview Form"
        visible={isModalPreviewVisible}
        onOk={handlePreviewOk}
        onCancel={handlePreviewCancel}
        footer={null}
      >
        <PreviewForm isTemplate={true} elementsTemplate={elementsPreview} />
      </Modal>
      
    </div>
  );
}

// <div className="flex gap-2">
// {/* {form.isFromLocalStorage && user && (

// )} */}
// {/*
// <Badge
//   onClick={(e) => {
//     e.stopPropagation();
//     deleteForm(form.id);
//   }}
//   className="bg-red-500 h-7 p-4 text-white font-bold"
// >
//   Delete
// </Badge> */}

// <Badge
//   onClick={(e) => {
//     e.stopPropagation();
//   }}
//   className="bg-yellow-500 h-7 p-4 text-white font-bold"
// >
//   <Link
//     href={`/forms/${form.id}?local=${
//       form.isFromLocalStorage ? "true" : "false"
//     }`}
//   >
//     Edit
//   </Link>
// </Badge>
// </div>
