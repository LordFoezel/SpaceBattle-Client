import { ReactElement } from "react";
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
import UserSettingPage from "../pages/UserSetting";
import LobbyPage from "../pages/lobby";
import { checkRole } from "../auth/auth";
import { AuthTokenHelper } from "../helper/authToken.js";

function NavigateBase() {
  const location = useLocation();
  return <Navigate to="/lobby" replace state={{ from: location }} />;
}

function ProtectedRoute({ children }: { children: ReactElement }) {
  const location = useLocation();

  try {
    const token = AuthTokenHelper.getStoredToken();
    if (!token) throw new Error("Missing token");

    const payload = AuthTokenHelper.decode(token);
    const exp = Number(payload?.exp);
    if (Number.isFinite(exp) && exp * 1000 <= Date.now()) {
      throw new Error("Expired token");
    }

    return children;
  } catch {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute>{checkRole(['admin']) ? <AdminPage /> : <NavigateBase />}</ProtectedRoute>} />
          <Route path="/user-setting" element={<ProtectedRoute><UserSettingPage /></ProtectedRoute>} />
          {/* Core */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/lobby" element={<ProtectedRoute><LobbyPage /></ProtectedRoute>} />
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
          <Route path="/test" element={<ProtectedRoute><TestPage /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}




