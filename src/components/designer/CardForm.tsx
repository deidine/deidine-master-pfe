"use client";
import { MdDeleteSweep } from "react-icons/md";
import { HiDocumentDuplicate } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import React, { useEffect, useState, useRef } from "react";
import { Badge } from "../ui/badge";
import { Modal, Dropdown, Menu, Button } from "antd";
import PreviewForm from "../forms/previews/PreviewForm";
import { useRouter } from "next/navigation";
import { CiCircleCheck } from "react-icons/ci";
import { deleteForm, openNotification, saveToDatabase } from "@/utils/utils";
import useGeneral from "@/hooks/useGeneral";
import { CiCircleInfo } from "react-icons/ci";
import { MdMoreHoriz } from "react-icons/md";
import { title } from "process";

export default function CardForm({
  form,
  reftchForm,
  isEditForm
}: {
  isEditForm: (value: boolean) => void;
  form: Form;
  reftchForm: (ok: boolean) => void;
}) {
  const [isModalPreviewVisible, setIsModalPreviewVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { isUserOnline, user } = useGeneral();
  const router = useRouter();

  const [elementsPreview, setElementsPreview] = useState<Form[]>([]);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsTruncated(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight
      );
    }
  }, [
    descriptionRef.current?.scrollHeight,
    descriptionRef.current?.clientHeight,
  ]);

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

  const handlePreviewOk = () => {
    setIsModalPreviewVisible(false);
  };

  const handlePreviewCancel = () => {
    setIsModalPreviewVisible(false);
  };

  const handleMenuClick = () => {
    setIsDropdownVisible(false);
  };

  const handlePreviewClick = async (e: any) => {
    e.stopPropagation();
    const form2 = await fetchForm(form.id);
    setElementsPreview(form2 ? form2.content : []);
    setIsModalPreviewVisible(true);
    handleMenuClick(); // Close the dropdown menu
  };

  const duplicateFormToLocalStorage = async (formToDuplicate: Form) => {
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    const newForm = { ...formToDuplicate, id: Date.now(),title: `${formToDuplicate.title} (Copy)` }; 
        forms.push(newForm);
    localStorage.setItem("forms", JSON.stringify(forms));
    openNotification(
      "topRight",
      "success",
      "Form duplicated successfully",
      "Form duplicated successfully in Local Storage"
    );
  };

  const handleDuplicateClick = async (e: any) => {
    e.stopPropagation();
    
    if (form.isFromLocalStorage) {
      duplicateFormToLocalStorage(form );
    } else { 
        const response = await saveToDatabase(
          `${form.title} (Copy)`,
          form.content,
          form.description,
          user!.id,
          undefined // New form, so no ID
        );
        openNotification(
          "topRight",
          "success",
          "Form duplicated successfully",
          response!
        );
      }
      reftchForm(true);
   
    handleMenuClick(); // Close the dropdown menu
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit" 
    
      >
        <button
          onClick={async (e) => {
            e.stopPropagation();
            setIsEdit(true);
            isEditForm(true);
            handleMenuClick(); // Close the dropdown menu
          }}
        className="flex flex-row gap-3 justify-between text-center items-center ">
          <TbEdit /> Edit
        </button>
      </Menu.Item>
      <Menu.Item key="delete">
        <button
          className="flex flex-row gap-3 justify-between text-center items-center "
          onClick={async (e) => {
            e.stopPropagation();
            const response = await deleteForm(form.id);
            !form.isFromLocalStorage &&  response === "error deleting form"?
            openNotification(
              "topRight",
              "error",
              "Error Deleting  forms :",
              response!
            )
            :
            openNotification(
              "topRight",
              "success",
              "Form deleted successfully",
              response!
            );
            form.isFromLocalStorage && openNotification(
              "topRight",
              "success",
              "Form deleted successfully",
              "Form deleted successfully from Localstorage"
            )
            handleMenuClick(); // Close the dropdown menu
            reftchForm(true);
          }}
        >
          <MdDeleteSweep /> Delete
        </button>
      </Menu.Item>
      <Menu.Item key="duplicate">
        <button
          className="flex flex-row gap-3 justify-between text-center items-center "
          onClick={handleDuplicateClick}
        >
          <HiDocumentDuplicate /> Duplicate
        </button>
      </Menu.Item>
      <Menu.Item key="preview">
        <button
          className="flex flex-row gap-3 justify-between text-center items-center "
          onClick={handlePreviewClick}
        >
          <FaEye /> Preview
        </button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div
        key={form.id}
        onClick={async () => {
          router.push(
            `/forms/${form.id}?local=${
              form.isFromLocalStorage ? "true" : "false"
            }`
          );
        }}
        className="rounded-[15px] relative hover:bg-slate-100 shadow-sm bg-white border-2 p-4 w-[400px] h-[200px] cursor-pointer"
      >
        <div className="flex flex-row justify-between items-center gap-4">
          <div className="text-3xl flex flex-row justify-between items-center gap-4">
            {form.isFromLocalStorage ? (
              <CiCircleInfo className="text-red-500" />
            ) : (
              <CiCircleCheck className="text-green-500" />
            )}{" "}
            <p className="text-lg"> {form.title}</p>
          </div>{" "}
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            visible={isDropdownVisible}
            onVisibleChange={(visible) => setIsDropdownVisible(visible)}
          >
            <button
              className="  mr-[18px]"
              onClick={(e) => e.stopPropagation()}
            >
              <MdMoreHoriz className="text-3xl hover:text-[#817d7d]" />
            </button>
          </Dropdown>
        </div>

        <p
          ref={descriptionRef}
          className={`text-md mt-4 ${
            !showFullDescription ? "line-clamp-3" : ""
          }`}
        >
          {form.description || "No description"}
        </p>
        <div className="absolute text-white right-0 mb-[18px] mr-[18px] bottom-0">
          {form.isFromLocalStorage && user && isUserOnline && (
            <Button
              className="bg-[#B5B5B5] h-7 font-semibold rounded-[20px] shadow-lg p-4 text-white"
              onClick={async (e) => {
                setIsLoading(true);

                e.stopPropagation();
           const response = await saveToDatabase(
                  form.title,
                  form.content,
                  form.description,
                  user.id,
                  form.id
                );
                setIsLoading(false);
                openNotification(
                  "topRight",
                  "success",
                  "Form saved successfully",
                  response!
                )
                deleteForm(form.id);
                reftchForm(true);
              }}
              loading={isLoading}
            >
              Sync to database
            </Button>
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
