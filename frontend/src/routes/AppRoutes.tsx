import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NewCurrencyPage from "../pages/NewCurrencyPage";
import CurrencyDetailPage from "../pages/CurrencyDetailPage";
import ProtectedRoute from "./guards/ProtectedRoute";
import GuestRoute from "./guards/GuestRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/currencies/new" element={<NewCurrencyPage />} />
        <Route path="/currencies/:id" element={<CurrencyDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
