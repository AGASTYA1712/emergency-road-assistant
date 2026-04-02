import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import RequestHelp from "./pages/RequestHelp";

import Dashboard from "./pages/Dashboard";
import MyRequests from "./pages/MyRequests";

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-targo-black font-rubik text-targo-white">
        {/* Persistent Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260227_042027_c4b2f2ea-1c7c-4d6e-9e3d-81a78063703f.mp4"
            type="video/mp4"
          />
        </video>
        
        {/* Routed Content */}
        <div className="relative z-10 flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/raise-request" element={<RequestHelp />} />
            <Route path="/my-requests" element={<MyRequests />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
