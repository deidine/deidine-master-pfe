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
import ModelForm from "./ModelForm";

export default function CardForm({
  form,
  isEditFormtrriger,
  reftchForm,
}: {
  form: Form;
  isEditFormtrriger: ( ) => void;
  reftchForm: (ok: boolean) => void;
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalPreviewVisible, setIsModalPreviewVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isUserOnline, setIsUserOnline, user } = useGeneral();
  const router = useRouter();

  const userId = user?.id;
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
      if (isUserOnline && !form.isFromLocalStorage) {
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
      return null;
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
    
    const baseTitle = formToDuplicate.title.replace(/\s*\(\d*\)$/, "").trim();
    
    let highestCopyNumber = 0;
    forms.forEach((form: Form) => {
      const match = form.title.match(new RegExp(`^${baseTitle}\\s*\\((\\d*)\\)$`));
      if (match) {
        const copyNumber = parseInt(match[1] || "1", 10);
        if (copyNumber > highestCopyNumber) {
          highestCopyNumber = copyNumber;
        }
      }
    });
   
    const newTitle = `${baseTitle} (${highestCopyNumber + 1})`;
  
    const newForm = {
      ...formToDuplicate,
      id: Date.now(),
      title: newTitle,
    };
  
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
      duplicateFormToLocalStorage(form);
    } else {
      const baseTitle = form.title.replace(/\s*\(\d*\)$/, "").trim();
      
      // Fetch all forms to find the highest copy number
      const response = await fetch(`/api/forms/?user_id=${user?.id}`);
    const  data= await response.json();
      const forms =  data.forms
      let highestCopyNumber = 0;
      forms.forEach((existingForm: Form) => {
        const match = existingForm.title.match(new RegExp(`^${baseTitle}\\s*\\((\\d*)\\)$`));
        if (match) {
          const copyNumber = parseInt(match[1] || "1", 10);
          if (copyNumber > highestCopyNumber) {
            highestCopyNumber = copyNumber;
          }
        }
      });
  
      // Create the new title with incremented copy number
      const newTitle = `${baseTitle} (${highestCopyNumber + 1})`;
  
      const saveResponse = await saveToDatabase(
        newTitle,
        form.content,
        form.description,
        user!.id,
        undefined // New form, so no ID
      );
      openNotification(
        "topRight",
        "success",
        "Form duplicated successfully",
        saveResponse!
      );
    }
    reftchForm(true);
  
    handleMenuClick(); // Close the dropdown menu
  };
  
  const editToLocalStorage = (title: string, description: string, formId: number) => {
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    const updatedForms = forms.map((form: any) => {
      if (form.id === formId) {
        return {
          ...form,
          title: title,
          description: description,
        };
      }
      return form;
    });
    localStorage.setItem("forms", JSON.stringify(updatedForms));
    openNotification(
      "topRight",
      "success",
      "Data updated",
      "Data updated successfully in local storage"
    );
    setIsModalVisible(false);
    isEditFormtrriger()
  };
  const handleEdit = async (title: string, description: string) => {
    if (!isUserOnline) {
      editToLocalStorage(title, description,form.id);
      return;
    } else {
      setIsUserOnline(true);
    }

    try {
      const response = await fetch(`/api/forms/${form.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
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
      openNotification(
        "topRight",
        "success",
        "Data inserted",
        "Data inserted successfully in database"
      );
      isEditFormtrriger()
    } catch (error) {
      editToLocalStorage(title, description,form.id);
      console.error("Error:", error);
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">
        <button
          onClick={async (e) => {
            e.stopPropagation();
         
            setIsModalVisible(true);
            handleMenuClick(); // Close the dropdown menu
          }}
          className="flex flex-row gap-3 justify-between text-center items-center "
        >
          <TbEdit /> Edit
        </button>
      </Menu.Item>
      <Menu.Item key="delete">
        <button
          className="flex flex-row gap-3 justify-between text-center items-center "
          onClick={async (e) => {
            e.stopPropagation();
            const response = await deleteForm(form.id);
            !form.isFromLocalStorage && response === "error deleting form"
              ? openNotification(
                  "topRight",
                  "error",
                  "Error Deleting  forms :",
                  response!
                )
              : openNotification(
                  "topRight",
                  "success",
                  "Form deleted successfully",
                  response!
                );
            form.isFromLocalStorage &&
              openNotification(
                "topRight",
                "success",
                "Form deleted successfully",
                "Form deleted successfully from Localstorage"
              );
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
        className="rounded-[15px] relative hover:bg-slate-100  bg-white border-2 p-4 w-[400px] h-[200px] cursor-pointer"
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
                );
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
      <ModelForm
        isAdd={false}
        isModalVisible={isModalVisible}
        handleOk={() => setIsModalVisible(false)}
        handleCancel={() => setIsModalVisible(false)}
        onFinish={async (values) => {
          await handleEdit(values.TitleForm, values.description);
        }}
        setIsModalVisible={setIsModalVisible}
        initialValues={{ TitleForm: form.title, description: form.description }} // Pre-fill with current form data
      />
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
