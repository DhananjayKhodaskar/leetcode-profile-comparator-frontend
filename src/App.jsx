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

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthSideImage />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="verify-email/:token" element={<VerifyEmail />} />
        </Route>
        <Route path="/app" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="group/:groupId/manage" element={<GroupInfo />} />
            <Route path="group/:groupId/chat" element={<GroupChat />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Invalid Path</h1>} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
