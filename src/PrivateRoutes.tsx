import { Navigate, Outlet, useLocation } from "react-router-dom";
const PrivateRoutes = () => {
  const location = useLocation();  
  let auth = true;  
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ path: location.pathname }} />
  );
};

export default PrivateRoutes;
