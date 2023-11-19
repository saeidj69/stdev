import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Card } from "antd";
import { loginApi } from "../../api/auth";
import Button from "../../components/uiKit/button";
import { StyledContainer } from "./style";
const LoginComponent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    debugger;
   
    try {
      const res = await loginApi({
        email: values.email,
        password: values.password,
      });
      if (res) {
        console.log(res);
        localStorage.setItem("token", res.token.access);
        localStorage.setItem("refreshToken", res.token.refresh);
        localStorage.setItem("userInfo",JSON.stringify(res.user));
        navigate("/posts");
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
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
    image: File;
  };
  return (
    <StyledContainer>
      <Card>
      <h3>
            Login
        </h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" hasLoading={true}>
              {t("Login")}
            </Button>
          </Form.Item>
        </Form>
        <Link to="/register">go to register</Link>

      </Card>
    </StyledContainer>
  );
};

export default LoginComponent;
