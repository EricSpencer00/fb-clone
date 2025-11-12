import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Wave Background (subtle) */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="url(#grad1)"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#2563eb", stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: "#7c3aed", stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            GraceNook
          </h1>
          <p className="text-2xl text-gray-700 font-semibold">Simple. Safe. Fun.</p>
        </div>

        {/* Value Prop */}
        <div className="mb-12 space-y-4 text-gray-600">
          <p className="text-lg">
            Connect with friends without the clutter. Share moments. Respect privacy.
          </p>
          <div className="grid grid-cols-3 gap-4 text-sm font-medium">
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🔒</div>
              <span>Privacy First</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">✨</div>
              <span>Clean Design</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-2">🎯</div>
              <span>Ad-Transparent</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={() => navigate("/auth/signup")}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => navigate("/auth/signin")}
            variant="outline"
            size="lg"
            className="px-8 border-2 border-gray-300 hover:border-gray-400"
          >
            Sign In
          </Button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-12">
          No clutter. No confusion. Just genuine connections.
        </p>
      </div>
    </div>
  );
}
