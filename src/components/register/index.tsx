import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Card } from "antd";
import { RegisterApi } from "../../api/auth";
import Button from "../../components/uiKit/button";
import Uploader from "../../components/uiKit/uploader";
import { StyledContainer } from "./style";
const RegisterComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };
  const onFinish = async (values: any) => {
    debugger;
    if(values.password!=values.confirm)
    return;
    try {
      const res = await RegisterApi({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirm:values.confirm,
        image: selectedFile,
      });
      if (res) {
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("refreshToken", res.refreshToken);
        navigate("/");
      }
    } catch (error) {
      throw error;
    }
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',      
    },

  };

  const onFinishFailed = (errorInfo: any) => {};

  type FieldType = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    confirm:string;
    image: File;
  };
  return (
    <StyledContainer>        
      <Card>
        <h3>
            Register
        </h3>
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
             rules={[{ required: true}]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("lastName")}
            name="lastName"
             rules={[{ required: true}]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("email")}
            name="email"
            rules={[{ required: true ,type: 'email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label={t("password")}
            name="password"
             rules={[{ required: true}]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType>
            label={t("confirmpassword")}
            name="confirm"
             rules={[{ required: true}]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FieldType> label={t("image")} name="image">
            <input type="file" onChange={handleFileUpload} />
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
