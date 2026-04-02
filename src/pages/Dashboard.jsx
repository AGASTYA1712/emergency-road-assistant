import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Search, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Driver");

  useEffect(() => {
    const userStr = localStorage.getItem("targo_user_data");
    if (!userStr) {
      navigate("/login");
    } else {
      const user = JSON.parse(userStr);
      setUserName(user.name);
    }
  }, [navigate]);

  return (
    <div className="relative z-10 flex flex-col min-h-screen px-8 md:px-16 pt-4 md:pt-6 pb-16 w-full max-w-6xl mx-auto h-full box-border">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-white/20 pb-6 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-gray-300">Targo Emergency Dispatch Hub</p>
        </div>
        
        <Link to="/login" className="text-targo-red hover:text-red-400 flex items-center gap-2 text-sm uppercase tracking-wider font-bold transition-colors w-fit md:ml-auto">
          <LogOut size={18} />
          Sign Out
        </Link>
      </div>

      {/* Action Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8">
        
        <Link to="/raise-request" className="glass-card group flex flex-col items-center justify-center p-12 hover:scale-[1.02] transition-transform duration-300">
          <div className="bg-targo-red/20 p-6 rounded-full mb-6 group-hover:bg-targo-red/40 transition-colors">
            <PlusCircle size={48} className="text-targo-red" />
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">Raise a Request</h2>
          <p className="text-gray-400 text-center text-sm max-w-[80%]">
            Experiencing an emergency? Select your issue and dispatch immediate assistance.
          </p>
        </Link>
        
        <Link to="/my-requests" className="glass-card group flex flex-col items-center justify-center p-12 hover:scale-[1.02] transition-transform duration-300">
          <div className="bg-white/10 p-6 rounded-full mb-6 group-hover:bg-white/20 transition-colors">
            <Search size={48} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white mb-2">See My Requests</h2>
          <p className="text-gray-400 text-center text-sm max-w-[80%]">
            View the status and history of all emergency requests you've logged.
          </p>
        </Link>

      </div>
    </div>
  );
}
