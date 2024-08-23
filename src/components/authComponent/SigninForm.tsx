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
      for (const form of forms) {
        await saveToDatabase( 
          form.title,
          form.content,
          form.description, 
        
          user.id
        );
        const forms = JSON.parse(localStorage.getItem("forms") || "[]");
        const updatedForms = forms.filter((form: Form) => form.id !== form.id);
        localStorage.setItem("forms", JSON.stringify(updatedForms));
      }
  
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
    <div className="selection:bg-buttonColor selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-buttonColor">
                Bienvenue!
              </h1>

              <Form
                form={form}
                name="signin"
                onFinish={onFinish}
                layout="vertical"
                className="mt-12"
              >
                <Form.Item
                  label="Email address"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email address!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid email!",
                    },
                  ]}
                >
                  <Input
                    id="signin-email"
                    placeholder="john@doe.com"
                    className="peer"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    id="signin-password"
                    placeholder="Password"
                    className="peer"
                  />
                </Form.Item>

                <Form.Item>
                <button className="bg-buttonColor cursor-pointer hover:bg-hoverButtonColor font-semibold mt-20 w-full uppercase text-white  text-center py-[0.8rem] mr-[1.5rem] rounded-lg">
               
              Connexion 
         </button>
              
               
                </Form.Item>
              </Form>
              <a
                href="#"
                className="mt-4 block text-sm text-center font-medium text-buttonColor hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Vous avez oublié votre mot de passe ?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
