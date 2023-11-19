import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const App: React.FC = () => {
    
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
    
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        
        type="primary"
        style={{  }}
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />
      <Drawer
        title="Basic Drawer"
        placement={dir=='rtl'?'right':'left'}
        onClose={onClose}
        open={open}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default App;
