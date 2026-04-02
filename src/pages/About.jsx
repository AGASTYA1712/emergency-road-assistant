import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen px-8 md:px-16 pt-4 md:pt-6 pb-16 w-full max-w-4xl mx-auto h-full box-border">
      
      {/* Header / Back */}
      <div className="w-full flex justify-between items-center mb-12 border-b border-white/20 pb-6">
        <div className="flex items-center gap-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-targo-white"
          >
            <path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M12 10V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-xl font-bold lowercase tracking-wider text-white">targo</span>
        </div>

        <Link to="/" className="text-gray-300 hover:text-white flex items-center gap-2 text-sm uppercase tracking-wider font-bold transition-colors">
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      {/* Content */}
      <div className="glass-card p-8 md:p-12 w-full flex flex-col gap-6">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-white">
          Swift and Simple<br className="hidden md:block" /> Transport
        </h1>
        <div className="h-1 w-16 bg-targo-red mb-4"></div>
        
        <p className="text-gray-300 leading-relaxed text-lg">
          At Targo, we believe that vehicular emergencies shouldn't derail your journey. 
          We have engineered a robust, lightning-fast dispatch architecture capable of 
          reaching stranded drivers across the continent in record time.
        </p>

        <p className="text-gray-300 leading-relaxed text-lg">
          Whether you've encountered a catastrophic engine failure or a simple dead battery, 
          our optimized supply chain of logistic experts and nearby mechanic partners ensures 
          your safety and immediate recovery.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="clip-button-tr-bl bg-targo-red px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors duration-300 text-center text-white">
            Register for Protection
          </Link>
          <Link to="/login" className="clip-button-tr-bl bg-white/10 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white/20 transition-colors duration-300 border border-white/20 text-center">
            Sign In
          </Link>
        </div>
      </div>
      
    </div>
  );
}
