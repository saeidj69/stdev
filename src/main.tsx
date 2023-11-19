import React from "react";
import { ConfigProvider } from "antd";
import { useTranslation } from "react-i18next";

import App from "./App";
const MainComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  let dir = (document.body.dir = i18n.dir());
  return (
    <ConfigProvider direction={dir}>
      <App />
    </ConfigProvider>
  );
};

export default MainComponent;
