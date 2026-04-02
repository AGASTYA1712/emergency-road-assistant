import { useState } from "react";
import { 
  Car, 
  BatteryWarning, 
  Fuel, 
  Truck, 
  Wrench, 
  Key, 
  Settings, 
  MapPin,
  ArrowLeft,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

export default function RequestHelp() {
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleBrand, setVehicleBrand] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emergencies = [
    { id: 1, title: "Flat Tire", icon: Car },
    { id: 2, title: "Dead Battery", icon: BatteryWarning },
    { id: 3, title: "Fuel Delivery", icon: Fuel },
    { id: 4, title: "Towing", icon: Truck },
    { id: 5, title: "Engine Breakdown", icon: Wrench },
    { id: 6, title: "Key Lockout", icon: Key },
    { id: 7, title: "Minor Mechanical Issues", icon: Settings },
    { id: 8, title: "Nearby Mechanic Support", icon: MapPin },
  ];

  const handleRequest = (emergency) => {
    setSelectedEmergency(emergency);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('targo_token');
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          service_type: selectedEmergency.title,
          location: 'Unknown Location', // To be enhanced later
          vehicle: `${vehicleBrand} ${vehicleNumber}`
        })
      });

      if (response.ok) {
        alert(`Help for ${selectedEmergency.title} is on the way for your ${vehicleBrand} (${vehicleNumber})!`);
        setSelectedEmergency(null);
        setVehicleNumber("");
        setVehicleBrand("");
      } else {
        const data = await response.json();
        alert(data.error || "Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 flex flex-col min-h-screen px-8 md:px-16 pt-4 md:pt-6 pb-16 w-full max-w-6xl mx-auto h-full box-border">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-white mb-2">
            Request Roadside Help
          </h1>
          <p className="text-gray-300 text-sm md:text-base">
            Select the emergency you're facing and we'll dispatch assistance immediately.
          </p>
        </div>
        
        <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-2 text-sm uppercase tracking-wider font-bold transition-colors w-fit md:ml-auto">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {emergencies.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="glass-card p-6 flex flex-col items-center text-center justify-between gap-6 hover:scale-[1.02] transition-transform duration-300">
              <div className="bg-white/10 p-4 rounded-full">
                <Icon size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-wide text-white h-12 flex items-center justify-center">
                {item.title}
              </h3>
              <button 
                onClick={() => handleRequest(item)}
                className="clip-button-tr-bl bg-targo-red w-full py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-red-600 transition-colors duration-300"
              >
                Select
              </button>
            </div>
          );
        })}
      </div>

      {/* Vehicle Details Modal Overlay */}
      {selectedEmergency && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card p-8 w-full max-w-md relative animate-in fade-in zoom-in duration-300">
            
            <button 
              onClick={() => setSelectedEmergency(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
                <selectedEmergency.icon size={20} className="text-targo-red" />
                {selectedEmergency.title}
              </h2>
              <p className="text-sm text-gray-300">
                Please provide your vehicle details so our response team can easily locate you.
              </p>
            </div>

            <form onSubmit={handleConfirm} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-300" htmlFor="brand">
                  Vehicle Brand / Company
                </label>
                <input
                  id="brand" type="text" required value={vehicleBrand} onChange={(e) => setVehicleBrand(e.target.value)}
                  className="bg-black/40 border border-white/20 text-white p-2.5 focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="e.g. Audi, Toyota, Ford"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-300" htmlFor="vehicleNumber">
                  Vehicle Number (License Plate)
                </label>
                <input
                  id="vehicleNumber" type="text" required value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)}
                  className="bg-black/40 border border-white/20 text-white p-2.5 focus:outline-none focus:border-red-500 transition-colors uppercase"
                  placeholder="ABC-1234"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="clip-button-tr-bl bg-targo-red px-6 py-4 mt-4 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors duration-300 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Dispatching..." : "Confirm Dispatch"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
