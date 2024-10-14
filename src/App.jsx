import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import AuthSideImage from "./components/AuthSideImage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthSideImage />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<h1>Invalid Path</h1>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
