import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Login,
  AdminKamar,
  AdminTipeKamar,
  AdminUser,
  AdminDashboard,
  ResepsionisDashboard,
  ResepsionisPemesanan,
  ReseprionisDetailPemesanan,
  TamuDashboard,
  TamuKamar,
  TamuDetailKamar,
  TamuCekPemesanan,
  TamuCetakPemesanan,
  TamuPemesanan,
  TamuHistoriPemesanan,
  Register,
} from "./pages";
import {
  AdminLayout,
  ResepsionisLayout,
  TamuLayout,
} from "./components/layout";
import { ProtectedRoutes, PublicRoutes } from "./utils/routes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PROTECTED ROUTES */}
      <Route path="/dashboard" element={<ProtectedRoutes />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="kamar" element={<AdminKamar />} />
          <Route path="tipe-kamar" element={<AdminTipeKamar />} />
          <Route path="user" element={<AdminUser />} />
        </Route>
        <Route path="resepsionis" element={<ResepsionisLayout />}>
          <Route index element={<ResepsionisDashboard />} />
          <Route path="pemesanan" element={<ResepsionisPemesanan />} />
          <Route
            path="detail-pemesanan/:id_pemesanan"
            element={<ReseprionisDetailPemesanan />}
          />
        </Route>
        <Route path="tamu" element={<TamuLayout />}>
          <Route index element={<TamuDashboard />} />
          <Route path="kamar" element={<TamuKamar />} />
          <Route
            path="detail-kamar/:id_tipe_kamar"
            element={<TamuDetailKamar />}
          />
          <Route path="cek-pemesanan" element={<TamuCekPemesanan />} />
          <Route path="pemesanan/:id_tipe_kamar" element={<TamuPemesanan />} />
          <Route path="histori-pemesanan" element={<TamuHistoriPemesanan />} />
        </Route>
        <Route
          path="tamu/cek-pemesanan/cetak-pemesanan/:id"
          element={<TamuCetakPemesanan />}
        />
      </Route>

      {/* PUBLIC ROUTES */}
      <Route element={<PublicRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* NOT FOUND */}
      <Route path="*" element={<Navigate to="/login" />} />
    </>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
