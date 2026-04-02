import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Car as CarIcon } from "lucide-react";

export default function MyRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Authenticate layout
    const userStr = localStorage.getItem("targo_user");
    if (!userStr) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userStr);

    // Iterating over all localStorage to find our segregated DBs
    const dbPrefix = "targo_db_issue_";
    const userRequests = [];

    // Scan the storage API
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(dbPrefix)) {
            const dbData = JSON.parse(localStorage.getItem(key) || "[]");
            // Pull out items matched purely by current logged in user email
            const matchedLogs = dbData.filter(ticket => ticket.userEmail === user.email);
            userRequests.push(...matchedLogs);
        }
    }

    // Sort by newest timestamp conceptually (by ID string which uses Date.now)
    userRequests.sort((a, b) => Number(b.id) - Number(a.id));

    setRequests(userRequests);
    setLoading(false);
  }, [navigate]);

  return (
    <div className="relative z-10 flex flex-col min-h-screen px-8 md:px-16 pt-4 md:pt-6 pb-16 w-full max-w-6xl mx-auto h-full box-border">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white mb-2">
            My Requests History
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Track and view all logged emergencies from your separated databases.
          </p>
        </div>
        
        <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-2 text-sm uppercase tracking-wider font-bold transition-colors w-fit md:ml-auto">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>

      {/* Main Request Grid */}
      {loading ? (
        <p className="text-gray-400">Loading your data...</p>
      ) : requests.length === 0 ? (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">No Requests Found</h3>
            <p className="text-gray-400 max-w-md">You haven't requested any roadside assistance yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {requests.map(req => (
                <div key={req.id} className="glass-card p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <h3 className="text-lg font-bold text-targo-red uppercase tracking-wider">
                            {req.problem}
                        </h3>
                        <span className="bg-targo-red text-white text-xs px-3 py-1 font-bold uppercase rounded-full">
                            Dispatched
                        </span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CarIcon size={16} className="text-gray-400" />
                            <span className="font-bold text-white">{req.vehicleBrand}</span> 
                            <span>({req.vehicleNumber})</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <Clock size={16} className="text-gray-400" />
                            <span>Requested at:</span>
                            <span className="font-medium text-white">{req.timestamp}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

    </div>
  );
}
