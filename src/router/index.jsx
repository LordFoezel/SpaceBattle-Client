import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import LoginPage from "../pages/login.jsx";
import RegisterPage from "../pages/register.jsx";
import ForgotPasswordPage from "../pages/forgotPassword.jsx";
import ResetPasswordPage from "../pages/resetPassword.jsx";
import NotFoundPage from "../pages/notFound.jsx";
import DashboardPage from "../pages/dashboard.jsx";
import AdminPage from "../pages/admin.jsx";
import VerifyPage from "../pages/verify.jsx";
import TestPage from "../pages/test.jsx";
import { checkRole } from "../auth/auth.ts";
import { BaseCard } from "../components/base/layout/BaseCard.jsx";

function NavigateLogin() {
  const location = useLocation();
  return <Navigate to="/login" replace state={{ from: location }} />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Admin */}
          <Route path="/admin" element={checkRole(['admin']) ? <AdminPage /> : <NavigateLogin />} />
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
          {/* Test */}
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}


