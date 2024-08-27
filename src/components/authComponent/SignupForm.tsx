 "use client";
import React from "react";
import { openNotification } from "@/utils/utils";
import { Form, Input, Button } from "antd";  
import { createClientBrowser } from "@/utils/supabase/client";
const SignupForm = () => {
  const [form] = Form.useForm();

  const onFinish = async(values: any) => {  
    const email = values.email ;
    const password = values.password  ;
    const supabase = createClientBrowser();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        
      }
    });

    if (error) {
      openNotification(
        "topRight",
        "error",
        "signup Failed",
        "Could not retrieve user data"
      );
    return;
    }

    openNotification(
      "topRight",
      "success",
      "signup Successful",
      "You have successfully signup in We try to save your data to our database automatically."
    );
    
  };
  return (
    <div className="selection:bg-buttonColor  selection:text-hoverButtonColor">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-buttonColor ">
              Créer un compte
              </h1>

              <Form
                form={form}
                name="signup"
                onFinish={onFinish}
                layout="vertical"
                className="mt-12"
              >
                <Form.Item
                  label="Nom"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer votre nom !",
                    },
                  ]}
                >
                  <Input
                    id="name"
                    placeholder="nom"
                    className="peer"
                  />
                </Form.Item>

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
                <button className="bg-buttonColor cursor-pointer hover:bg-hoverButtonColor font-semibold mt-10
                 w-full uppercase text-white h-10  font-title text-center py-[0.5rem] mr-[1.5rem] rounded-lg">
                 Register
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

export default SignupForm;
