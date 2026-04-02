import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative z-10 flex flex-col min-h-screen px-8 md:px-16 pt-4 md:pt-6 pb-8 md:pb-16 w-full max-w-7xl mx-auto h-full box-border">
      {/* Header */}
      <header className="flex items-center justify-between w-full mb-auto pb-4">
        <div className="flex items-center gap-3">
          {/* SVG Logo */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-targo-white"
          >
            <path
              d="M12 2L2 22H22L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M12 10V18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xl font-bold lowercase tracking-wider">
            targo
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link to="/" className="hover:text-targo-red transition-colors duration-200">Home</Link>
          <Link to="/about" className="hover:text-targo-red transition-colors duration-200">About</Link>
          <a href="#contact" className="hover:text-targo-red transition-colors duration-200">Contact Us</a>
        </nav>

        {/* Header Action */}
        <Link to="/login" className="hidden md:block clip-button-tr-bl bg-targo-red px-6 py-2.5 text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors duration-300">
          Login
        </Link>
      </header>

      {/* Main Hero Wrapper - upper-third alignment */}
      <main className="flex-1 flex flex-col justify-start mt-8 md:mt-24">
        <div className="max-w-2xl">
          <h1 className="text-[42px] leading-[1.1] md:text-[64px] font-bold uppercase tracking-tighter mb-8 text-targo-white">
            Swift and Simple Transport
          </h1>
          <Link to="/login" className="inline-block clip-button-tr-bl bg-targo-red px-8 py-4 text-base md:text-lg font-bold uppercase tracking-wider hover:bg-red-600 transition-colors duration-300">
            Get Started
          </Link>
        </div>
      </main>

    </div>
  );
}
