"use client";
import React, { useState } from "react";
import { Form, Input, Button, Spin, notification } from "antd";
import { createClientBrowser } from "@/utils/supabase/client"; 
import { LoadingOutlined } from "@ant-design/icons";
import { openNotification, saveToDatabase } from "@/utils/utils";

const SigninForm = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false); 
  const onFinish = async (values: any) => {
    setIsLoading(true);
    const email = values.email;
    const password = values.password;
    const supabase = createClientBrowser();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsLoading(false);
      openNotification(
        "topRight",
        "error",
        "Login Failed",
        "Could not authenticate user"
      );
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); 
      openNotification(
        "topRight",
        "success",
        "Login Successful",
        "You have successfully logged in We try to save your data to our database automatically."
      );
      const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      // for (const form of forms) {
      //   await saveToDatabase( 
      //     form.title,
      //     form.content,
      //     form.description, 
        
      //     user.id
      //   );
      //   const forms = JSON.parse(localStorage.getItem("forms") || "[]");
      //   const updatedForms = forms.filter((form: Form) => form.id !== form.id);
      //   localStorage.setItem("forms", JSON.stringify(updatedForms));
      // }
  
      if (typeof window !== "undefined") {
        window.location.href = "/forms";
      }
    } else {
      setIsLoading(false);
      openNotification(
        "topRight",
        "error",
        "Login Failed",
        "Could not retrieve user data"
      );
    }
  };
  if (isLoading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    );
  }

  return (
    <div className="selection:bg-buttonColor  selection:text-hoverButtonColor">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-buttonColor ">
                Connectez-vous
              </h1>

              <Form
                form={form}
                name="Connextion"
                onFinish={onFinish}
                layout="vertical"
                className="mt-12"
              >
          
                <Form.Item
                  label="Adresse email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir votre adresse email !",
                    },
                    {
                      type: "email",
                      message: "L\'entrée n\'est pas un email valide !",
                    },
                  ]}
                >
                  <Input
                    id="email"
                    placeholder="john@doe.com"
                    className="peer"
                  />
                </Form.Item>

                <Form.Item
                  label="Mot de passe"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez saisir votre mot de passe !",
                    },
                  ]}
                >
                  <Input.Password
                    id="password"
                    placeholder="Password"
                    className="peer"
                  />
                </Form.Item>

                <Form.Item>
                <button className="bg-buttonColor cursor-pointer hover:bg-hoverButtonColor font-semibold
                 mt-10  font-title h-10 w-full uppercase text-white  text-center py-[0.5rem] mr-[1.5rem] rounded-lg">
                 Connexion
         </button>
              
                 
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
