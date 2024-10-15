import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import AuthSideImage from "./components/AuthSideImage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail"; // Import the new page
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthSideImage />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="verify-email/:token" element={<VerifyEmail />} />{" "}
        </Route>
        <Route path="*" element={<h1>Invalid Path</h1>} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
