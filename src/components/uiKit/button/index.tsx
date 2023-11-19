import React, { FC, ReactNode, useState } from "react";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
interface ButtonComponentProps {
  type: "link" | "text" | "default" | "primary" | "dashed";
  children: ReactNode;
  hasLoading: boolean;
  htmlType?: "button" | "submit" | "reset";
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  type = "default",
  children,
  hasLoading,
  htmlType,
}) => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);
  return (
    <Button type={type} htmlType={htmlType}>
      {isLoading && hasLoading ? (
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 22, color: "white" }} spin />
          }
        />
      ) : (
        ""
      )}
      {children}
    </Button>
  );
};

export default ButtonComponent;
