import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import LoginPage from "../pages/login.jsx";
import RegisterPage from "../pages/register.jsx";
import ForgotPasswordPage from "../pages/forgotPassword.jsx";
import ResetPasswordPage from "../pages/resetPassword.jsx";
import NotFoundPage from "../pages/notFound.jsx";
import DashboardPage from "../pages/dashboard.jsx";
import AdminPage from "../pages/admin.jsx";
import VerifyPage from "../pages/verify.jsx";
import { checkRole } from "../auth/auth.js";

function NavigateLogin() {
  return <Navigate to="/login" replace state={{ from: loc }} />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Admin */}
          <Route path="/admin" element={checkRole(['admin']) ? <AdminPage /> : NavigateLogin()} />
          {/* Core */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* Base */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}


