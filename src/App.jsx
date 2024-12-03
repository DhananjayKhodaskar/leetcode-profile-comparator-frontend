import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/app/Dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import AuthSideImage from "./components/AuthSideImage";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import VerifyEmail from "./pages/auth/VerifyEmail"; // Import the new page
import { Toaster } from "@/components/ui/toaster";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import GroupInfo from "./pages/app/GroupInfo";
import GroupChat from "./components/GroupChat";
import Challenge from "./pages/app/Challenge";
import Progress from "./pages/app/Progress";
import SolvedProblem from "./pages/app/SolvedProblem";
import Profile from "./pages/app/Profile";
import ChangePassword from "./pages/app/ChangePassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <GoogleOAuthProvider clientId="1050286419280-p582p65o3ns35acgf2o3gnaavcmd4sti.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<AuthSideImage />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="verify-email/:token" element={<VerifyEmail />} />
          </Route>
          <Route path="/app" element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="solvedProblems" element={<SolvedProblem />} />
              <Route path="group/:groupId/manage" element={<GroupInfo />} />
              <Route path="group/:groupId/chat" element={<GroupChat />} />
              <Route path="group/:groupId/challenge" element={<Challenge />} />
              <Route path="group/:groupId/progress" element={<Progress />} />
            </Route>
          </Route>
          <Route path="*" element={<h1>Invalid Path</h1>} />
        </Routes>
        <Toaster />
      </GoogleOAuthProvider>
      ;
    </ThemeProvider>
  );
}

export default App;
