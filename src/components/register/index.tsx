import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Card, notification } from "antd";
import { RegisterApi } from "../../api/auth";
import Button from "../../components/uiKit/button";
import UploadImage from "../../assets/image/upload.png";

import { StyledContainer } from "./style";
const RegisterComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<any>({});
  const handleFileUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const Context = React.createContext({ name: "Default" });
  const [api, contextHolder] = notification.useNotification();
  const onFinish = async (values: any) => {
    debugger;
    if (values.password != values.confirm) {
      api.error({
        message: "Error",
        description: "password and confirm are different!",
        placement: "topLeft",
      });
      return;
    }


    try {
      const res = await RegisterApi({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirm: values.confirm,
        image: selectedFile,
      });
      if (res) {
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("refreshToken", res.refreshToken);
        navigate("/login");
      }
    } catch (error:any) {
      api.error({
        message: "Error",
        description:error.response.data.detail,
        placement: "topLeft",
      });
    }
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const onFinishFailed = (errorInfo: any) => {};

  type FieldType = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirm: string;
    image: File;
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePreviewClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debugger;
    const file = event.target.files?.[0];
    setSelectedFile(event.target.files?.[0]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <StyledContainer>
      {contextHolder}
      <Card>
        <h3>Register</h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Form.Item<FieldType>
            label={t("firstName")}
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("lastName")}
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("email")}
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("password")}
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("confirmpassword")}
            name="confirm"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("image")}
            name="image"
            rules={[{ required: true }]}
          >
            <div className="preview-section" onClick={handlePreviewClick}>
              {previewUrl ? (
                <div className="card-image">
                  <img
                    src={previewUrl}
                    alt="File Preview"
                    className="img-fluid"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              ) : (
                <div className="upload-placeholder">
                  <img
                    src={UploadImage}
                    alt="File Preview"
                    className="img-fluid"
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" hasLoading={true}>
              {t("Register")}
            </Button>
          </Form.Item>
        </Form>
        <Link to="/login">go to login</Link>
      </Card>
    </StyledContainer>
  );
};

export default RegisterComponent;
