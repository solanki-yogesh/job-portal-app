import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import AdminJobs from "../features/jobs/AdminJobs";
import CandidateJobs from "../features/jobs/CandidateJobs";
import Layout from "../layouts/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes wrapped in Layout */}
      <Route element={<Layout />}>
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminJobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute role="candidate">
              <CandidateJobs />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;