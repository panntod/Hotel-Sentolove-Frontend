import { Outlet, Navigate } from "react-router-dom";
import { userAuth } from "../helper/getAuth";

export default function PublicRoutes() {
  const { auth, role } = userAuth();
  return (
    <>
      {auth ? (
        role === "admin" ? (
          <Navigate to="/dashboard/admin/" />
        ) : role === "resepsionis" ? (
          <Navigate to="/dashboard/resepsionis/" />
        ) : (
          <Navigate to="/dashboard/tamu/" />
        )
      ) : (
        <Outlet />
      )}
    </>
  );
}
