"use client";

import { ConfigProvider } from "antd";
import React from "react";

const AntdConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ConfigProvider
      prefixCls="ant"
      iconPrefixCls="anticon"
      theme={{
        token: {
          colorPrimary: "#6564FE", // Tailwind title color
          colorText: "#6564FE", // Tailwind mainTextColor
          // colorBgContainer: "#E8E8E8", // Tailwind mainColor
 
          colorPrimaryHover: "#A6A6EC", // Tailwind hoverButtonColor
          fontFamily: "DM Sans, sans-serif", // Tailwind text font
          // You can add more tokens as needed
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
