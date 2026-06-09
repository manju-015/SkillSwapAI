import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import RequestsPage from "./pages/RequestsPage";
import ConnectionsPage from "./pages/ConnectionsPage";
import ChatPage from "./pages/ChatPage";
import StudyPlanPage from "./pages/StudyPlanPage";
import SessionsPage from "./pages/SessionsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ReviewsPage from "./pages/ReviewsPage";
import AdminPage from "./pages/admin/AdminPage";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserManagementPage from "./pages/admin/UserManagementPage";
import SessionManagementPage from "./pages/admin/AdminSessionsPage";
import ConnectionManagementPage from "./pages/admin/ConnectionManagementPage";
import ReportsPage from "./pages/admin/ReportsPage";
import PlatformSettingsPage from "./pages/admin/PlatformSettingsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

import PrivateRoute from "./routes/PrivateRoute";

import Navbar from "./components/Navbar";
import Layout from "./components/Layout";

function App() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        {/* PROTECTED ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <Layout>
                <DashboardPage />
              </Layout>
            }
          />

          <Route
            path="/users"
            element={
              <Layout>
                <UsersPage />
              </Layout>
            }
          />

          <Route
            path="/profile"
            element={
              <Layout>
                <ProfilePage />
              </Layout>
            }
          />

          <Route
            path="/requests"
            element={
              <Layout>
                <RequestsPage />
              </Layout>
            }
          />

          <Route
            path="/connections"
            element={
              <Layout>
                <ConnectionsPage />
              </Layout>
            }
          />
          <Route
            path="/change-password"
            element={
              <Layout>
                <ChangePasswordPage />
              </Layout>
            }
          />
          <Route
            path="/chat/:userId"
            element={
              <Layout>
                <ChatPage />
              </Layout>
            }
          />

          <Route
            path="/study-plan"
            element={
              <Layout>
                <StudyPlanPage />
              </Layout>
            }
          />

          <Route
            path="/sessions"
            element={
              <Layout>
                <SessionsPage />
              </Layout>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              userInfo?.isAdmin ? (
                <Layout>
                  <AnalyticsPage />
                </Layout>
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="/notifications"
            element={
              <Layout>
                <NotificationsPage />
              </Layout>
            }
          />

          <Route
            path="/reviews/:userId"
            element={
              <Layout>
                <ReviewsPage />
              </Layout>
            }
          />

          <Route
            path="/admin"
            element={
              userInfo?.isAdmin ? (
                <Layout>
                  <AdminPage />
                </Layout>
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
        </Route>
        <Route
          path="/admin/users"
          element={
            <Layout>
              <UserManagementPage />
            </Layout>
          }
        />
        <Route
          path="/admin/sessions"
          element={
            <Layout>
              <SessionManagementPage />
            </Layout>
          }
        />
        <Route
          path="/admin/connections"
          element={
            <Layout>
              <ConnectionManagementPage />
            </Layout>
          }
        />

        <Route
          path="/admin/reports"
          element={
            <Layout>
              <ReportsPage />
            </Layout>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <Layout>
              <PlatformSettingsPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
