 "use client";
import React from "react";
import { Form, Input, Button } from "antd"; 
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
const SignupForm = () => {
  const [form] = Form.useForm();

  const onFinish = async(values: any) => {
    
"use server";

    const origin = headers().get("origin");
    const email = values.get("email") as string;
    const password = values.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };
  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1 className="text-5xl font-bold text-indigo-600">
                Create account
              </h1>

              <Form
                form={form}
                name="signup"
                onFinish={onFinish}
                layout="vertical"
                className="mt-12"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input
                    id="name"
                    placeholder="Name"
                    className="peer"
                  />
                </Form.Item>

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
                    id="email"
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
                    id="password"
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
                    Sign up
                  </Button>
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
