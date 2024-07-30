"use client";
import React from "react";
import { Form, Input, Button } from "antd";
import { createClientBrowser } from "@/utils/supabase/client";
import useGeneral from "@/hooks/useGeneral";
const SigninForm = () => {
  const [form] = Form.useForm();

   const { setUser  } = useGeneral()
  const onFinish = async(values: any) => {
    console.log("Form submitted:", values); 
    const email = values.email;
    const password = values.password;
    const supabase = createClientBrowser();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return alert("/login?message=Could not authenticate user");
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      // return redirect("/login");
    }else{
      setUser(user)
      localStorage.setItem("user",JSON.stringify(user))
    }
    return alert("/protected");
  };

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600">
                Welcome back!
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="mt-20 w-full uppercase rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>

              <a
                href="#"
                className="mt-4 block text-sm text-center font-medium text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
