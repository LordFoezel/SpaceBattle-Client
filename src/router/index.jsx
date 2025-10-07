import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import LoginPage from "../pages/login.jsx";
import RegisterPage from "../pages/register.jsx";
import ForgotPasswordPage from "../pages/forgotPassword.jsx";
import ResetPasswordPage from "../pages/resetPassword.jsx";
import NotFoundPage from "../pages/notFound.jsx";
import DashboardPage from "../pages/dashboard.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}


