import React, { FC, ReactNode, useState } from "react";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
interface ButtonComponentProps {
  type?: "link" | "text" | "default" | "primary" | "dashed";
  children: ReactNode;
  hasLoading?: boolean;
  htmlType?: "button" | "submit" | "reset";
  onClick?:any
  style?:any
}

const ButtonComponent: FC<ButtonComponentProps> = ({
  type = "default",
  children,
  hasLoading,
  htmlType,
  onClick,
  style
}) => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);
  return (
    <Button style={style} type={type} htmlType={htmlType} onClick={onClick} >
      {isLoading && hasLoading ? (
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 22, color: "white" , margin:'0 5px' }} spin />
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
