import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('targo_token', data.token);
        localStorage.setItem('targo_user_data', JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid email or password!");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to connect to server");
    }
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
            Sign In
          </h2>
          <p className="text-sm text-gray-400">
            Access your Targo account
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-targo-red/50 text-targo-red px-4 py-3 text-sm font-bold text-center tracking-wider uppercase">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-300" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/40 border border-white/20 text-white p-3 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black/40 border border-white/20 text-white p-3 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="clip-button-tr-bl bg-targo-red px-6 py-4 mt-2 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors duration-300 text-white"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-2">
          <p className="text-xs text-gray-400">
            Don't have an account? <Link to="/register" className="text-white hover:text-red-500 font-bold underline transition-colors">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
