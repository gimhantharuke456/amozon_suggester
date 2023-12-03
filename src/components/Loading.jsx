import React from "react";
import { Spin } from "antd"; // You can use the Spin component from Ant Design or any other loading indicator library

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpinner;
