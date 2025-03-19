import { Outlet } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <div>
      <h1>Authentication</h1>
      <Outlet />
    </div>
  );
};

export default AuthRoutes;
