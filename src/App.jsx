import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<h1>Invalid Path</h1>} />
    </Routes>
  );
}

export default App;
