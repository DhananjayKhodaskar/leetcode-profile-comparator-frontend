import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="prose">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="*" element={<h1>Invalid Path</h1>} />
      </Routes>
    </div>
  );
}

export default App;
