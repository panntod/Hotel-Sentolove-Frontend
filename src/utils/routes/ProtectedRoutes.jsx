import { Outlet } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import ResepsionisLayout from "../../components/layout/ResepsionisLayout";
import TamuLayout from "../../components/layout/TamuLayout";
import { userAuth } from "../helper/getAuth";

const ProtectedRoutes = () => {
  const { role } = userAuth();
  return role === "admin" ? (
    <Outlet render={(props) => <AdminLayout {...props} />} />
  ) : role === "resepsionis" ? (
    <Outlet render={(props) => <ResepsionisLayout {...props} />} />
  ) : (
    <Outlet render={(props) => <TamuLayout {...props} />} />
  );
};

export default ProtectedRoutes;
