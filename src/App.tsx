
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import { useTranslation } from "react-i18next";
import Login from "./pages/Login";
import Register from "./pages/Regiester";
import PanelLayout from "./components/layout/panelLayout";
import LoginComponent from "./components/layout/loginLayout";
import Posts from "./components/posts";
function App() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<PanelLayout />}>            
            <Route path="/posts" element={<Posts />} />
          </Route>
        </Route>
        <Route element={<LoginComponent />}>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
