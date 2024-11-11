import React from "react";
import { Spin } from "antd";

const CustomLoadingOverlay: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent overlay
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // Ensure it appears above other content
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default CustomLoadingOverlay;
