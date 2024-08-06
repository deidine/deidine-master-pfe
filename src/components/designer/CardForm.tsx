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

export default function CardForm({
  form,
  reftchForm,
}: {
  form: Form;
  reftchForm: () => void;
}) {
  const [isModalPreviewVisible, setIsModalPreviewVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);   

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

  // const deleteForm = async (id: number) => {
  //   try {
  //     const response = await fetch(`/api/forms/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     reftchForm();
  //     if (!response.ok) {
  //       throw new Error("Error deleting form");
  //     }
  //     openNotification(
  //       "topRight",
  //       "success",
  //       "Form deleted successfully",
  //       "Form deleted successfully from database"
  //     );
  //   } catch (error) {
  //     const forms = JSON.parse(localStorage.getItem("forms") || "[]");
  //     const updatedForms = forms.filter((form: Form) => form.id !== id);
  //     localStorage.setItem("forms", JSON.stringify(updatedForms));
  //     updatedForms[0].isFromLocalStorage &&
  //       openNotification(
  //         "topRight",
  //         "success",
  //         "Form deleted successfully",
  //         "Form deleted successfully from Localstorage"
  //       );
  //   }
  // };

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

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">
        <button
          className="flex flex-row gap-3 justify-between text-center items-center "         
        >
          <TbEdit /> Edit
        </button>
      </Menu.Item>
      <Menu.Item key="delete">
        <button
          className="flex flex-row gap-3 justify-between text-center items-center "
          onClick={(e) => {
            e.stopPropagation();
            deleteForm(form.id);
            handleMenuClick(); // Close the dropdown menu
            reftchForm();
          }}
        >
          <MdDeleteSweep /> Delete
        </button>
      </Menu.Item>
      <Menu.Item key="duplicate">
        <button
          className="flex flex-row gap-3 justify-between text-center items-center "
          onClick={(e) => {
            e.stopPropagation();
            // Add duplicate functionality here
            handleMenuClick(); // Close the dropdown menu
          }}
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
        className="rounded-[15px] relative bg-white border-2 p-4 w-[400px] h-[200px] cursor-pointer"
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
              <MdMoreHoriz className="text-3xl hover:text-[#E8E8E8]" />
            </button>
          </Dropdown>
        </div>

        <p
          ref={descriptionRef}
          className={`text-lg mt-4 ${
            !showFullDescription ? "line-clamp-3" : ""
          }`}
        >
          {form.description || "No description"}
        </p>
        {/* {isTruncated && (
          <span
            className="text-blue-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowFullDescription(!showFullDescription);
            }}
          >
            {showFullDescription ? "View less" : "View more"}
          </span>
        )} */}
        <div className="absolute text-white right-0 mb-[18px] mr-[18px] bottom-0">
          {form.isFromLocalStorage && user && (
            <Button 
              className="bg-[#B5B5B5] h-7 font-semibold rounded-[20px] shadow-lg p-4 text-white"
              onClick={(e) => {
                setIsLoading(true);

                e.stopPropagation();
                saveToDatabase(
                  form.title,
                  form.content,
                  form.description,
                  false,
                  user.id,
                  form.id
                ); 
                setIsLoading(false);

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
