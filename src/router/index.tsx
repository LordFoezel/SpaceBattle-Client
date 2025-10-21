import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "../components/layout/layout";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import ForgotPasswordPage from "../pages/forgotPassword";
import ResetPasswordPage from "../pages/resetPassword";
import NotFoundPage from "../pages/notFound";
import DashboardPage from "../pages/dashboard";
import AdminPage from "../pages/admin";
import VerifyPage from "../pages/verify";
import TestPage from "../pages/test";
import LobbyPage from "../pages/Lobby";
import { checkRole } from "../auth/auth";

function NavigateBase() {
  const location = useLocation();
  return <Navigate to="/lobby" replace state={{ from: location }} />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Admin */}
          <Route path="/admin" element={checkRole(['admin']) ? <AdminPage /> : <NavigateBase />} />
          {/* Core */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* Base */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* Test */}
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}




