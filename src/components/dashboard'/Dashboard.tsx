import React, { useEffect, useState, useCallback } from "react";
import { Button, Divider } from "antd";
import CardForm from "./CardForm";
import { openNotification, saveToDatabase } from "@/utils/utils";
import useGeneral from "@/hooks/useGeneral";
import { CiCircleCheck, CiCircleInfo } from "react-icons/ci";
import ModelForm from "./ModelForm";
import DasboradSkeleton from "../skeletons/DasboradSkeleton";

export default function Dashboard() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isUserOnline, setIsUserOnline, user } = useGeneral();
  const [elements, setElements] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [elementsLocalStorage, setElementsLocalStorage] = useState<Form[]>([]);
  const userId = user?.id;

  const fetchForms = useCallback(async () => {
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
      setIsUserOnline(false);
      setElementsLocalStorage(forms);
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  }, [isUserOnline, userId, setIsUserOnline]); // Include setIsUserOnline here

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const saveToLocalStorage = (title: string, description: string) => {
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    forms.push({
      id: Date.now(),
      title: title,
      content: [],
      style: {},
      buttonStyle: {},
      elementStyle: {},
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
          style: {},
          buttonStyle: {},
          elementStyle: {},
          description: description,
          user_id: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setIsModalVisible(false);
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

  async function saveAllToDb() {
    setIsLoading(true);
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    for (const form of forms) {
      user &&
        (await saveToDatabase(
          form.title,
          form.content,
          form.description,
          user.id
        ));
      const updatedForms = forms.filter((f: Form) => f.id !== form.id);
      localStorage.setItem("forms", JSON.stringify(updatedForms));
    }
    openNotification(
      "topRight",
      "success",
      "Data inserted:",
      "Data inserted successfully in database"
    );
    fetchForms();
    setIsLoading(false);
  }

  if (loading) {
    return (
      <div className="w-full h-screen">
        <DasboradSkeleton />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="w-full bg-mainColor flex justify-end px-[2.5rem] pt-[1rem] items-end">
          <div className="flex gap-4">
            {elementsLocalStorage.length > 0 && user && isUserOnline && (
              <Button
                loading={isLoading}
                className="bg-[#B5B5B5] h-7 font-semibold rounded-[20px] shadow-lg p-4 text-white"
                onClick={saveAllToDb}
              >
                Sync all forms to database
              </Button>
            )}
            <button
              className="btn_header bg-blue-400 text-white"
              onClick={() => setIsModalVisible(true)}
            >
              Create New Form
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-lg border-2 p-4">
          {elementsLocalStorage.length > 0 && (
            <p className="text-[25px] px-[2.5rem] flex flex-row gap-3 text-center items-center mb-4">
              <CiCircleInfo className="text-red-500" /> Forms from Local Storage
            </p>
          )}
     
          <div className="flex px-[2.5rem] flex-wrap gap-[2rem]">
            {elementsLocalStorage.map((element) => (
              <CardForm
                reftchForm={(ok: boolean) => ok && fetchForms()}
                form={element}
                key={element.id}
                isEditFormtrriger={(): void => {
                  fetchForms();
                }}
              />
            ))}
          </div>
          {elements.length > 0 && elementsLocalStorage.length > 0 && (
            <Divider
              style={{
                borderColor: "black",
                marginTop: "1rem",
                marginBottom: "1rem",
                width: "100%",
                height: "1px",
              }}
            />
          )}
          {elements.length > 0 && (
            <p className="text-[25px] px-[2.5rem] flex flex-row gap-3 text-center items-center mb-4">
              <CiCircleCheck className="text-green-500" /> Forms from Database
            </p>
          )}
          {elements.length === 0 && (
            <p className="text-[25px] px-[2.5rem] flex flex-row gap-3 text-center items-center mb-4">
              <CiCircleCheck className="text-green-500" /> No forms in database
            </p>
          )}
          <div className="flex px-[2.5rem] flex-wrap gap-[2rem]">
            {elements.map((element) => (
              <CardForm
                form={element}
                key={element.id}
                reftchForm={fetchForms}
                isEditFormtrriger={(): void => {
                  fetchForms();
                }}
              />
            ))}
          </div>
          {elementsLocalStorage.length === 0 && (
            <p className="text-[25px] px-[2.5rem] flex flex-row gap-3 text-center items-center mb-4">
              <CiCircleInfo className="text-red-500" /> No forms in local storage
            </p>
          )}
        </div>
      </div>

      <ModelForm
        isAdd={true}
        isModalVisible={isModalVisible}
        handleOk={() => setIsModalVisible(false)}
        handleCancel={() => setIsModalVisible(false)}
        onFinish={async (values: any) => {
          await handleSave(values.TitleForm, values.description);
          fetchForms();
        }}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}
