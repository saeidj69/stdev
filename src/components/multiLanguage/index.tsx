import { Select } from "antd";
import { useTranslation } from "react-i18next";
const Navbar = () => {
  const { i18n, t } = useTranslation();

  const onChangeLang = (value: string) => {
    
    const lang_code = value;
    i18n.changeLanguage(lang_code);
    
  };
  return (
    <nav>
      <Select
        defaultValue="en"
        onChange={onChangeLang}
        style={{ width: 120 }}
        options={[
          { value: "en", label: "english" },
          { value: "ar", label: "عربی" },
        ]}
      />
    </nav>
  );
};

export default Navbar;
