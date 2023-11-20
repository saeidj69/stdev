import { Select } from "antd";
import { useTranslation } from "react-i18next";
const Navbar = () => {
  const { i18n, t } = useTranslation();

  const onChangeLang = (value: string) => {
    debugger
    const lang_code = value;
    i18n.changeLanguage(lang_code);
    console.log(`selected ${value}`);
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
