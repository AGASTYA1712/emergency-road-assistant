import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage to mock a database registration
    localStorage.setItem("targo_user", JSON.stringify(formData));
    
    // Redirect to login page for them to sign in
    navigate("/login");
  };

  return (
    <div className="relative z-10 flex flex-col min-h-screen px-8 py-8 w-full max-w-md mx-auto justify-center items-center h-full box-border">
      
      {/* Back Button */}
      <div className="w-full flex justify-start mb-6">
        <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2 text-sm uppercase tracking-wider font-bold transition-colors">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      <div className="glass-card p-8 w-full flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">
            Register
          </h2>
          <p className="text-sm text-gray-400">
            Create your Targo emergency account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-300" htmlFor="name">
              Full Name
            </label>
            <input
              id="name" type="text" required onChange={handleChange} value={formData.name}
              className="bg-black/40 border border-white/20 text-white p-2.5 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-300" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone" type="tel" required onChange={handleChange} value={formData.phone}
              className="bg-black/40 border border-white/20 text-white p-2.5 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-300" htmlFor="email">
              Email Address
            </label>
            <input
              id="email" type="email" required onChange={handleChange} value={formData.email}
              className="bg-black/40 border border-white/20 text-white p-2.5 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              id="password" type="password" required onChange={handleChange} value={formData.password}
              className="bg-black/40 border border-white/20 text-white p-2.5 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="clip-button-tr-bl bg-targo-red px-6 py-4 mt-4 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors duration-300 text-white"
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="text-xs text-gray-400">
            Already have an account? <Link to="/login" className="text-white hover:text-red-500 font-bold underline transition-colors">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
