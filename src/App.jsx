import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="prose">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<h1>Invalid Path</h1>} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
