"use client";

import React from "react";
import { Form, Input, Button } from "antd";

const SignupForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
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
