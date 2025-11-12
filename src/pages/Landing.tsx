import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Waves } from "@/components/ui/wave-background";

export function Landing() {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<"signup" | "signin" | null>(null);

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section with Wave Background */}
      <div className="relative min-h-[80vh] w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        {/* Wave Background Component */}
        <div className="absolute inset-0 opacity-100">
          <Waves 
            strokeColor="#2563eb" 
            backgroundColor="#f0f9ff"
            pointerSize={0.8}
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 pt-20 pb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
              GraceNook
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Simple. Safe. Fun.
            </p>
            <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
              A social network built for genuine connections, not endless scrolling.
              Privacy you control. Transparency you deserve.
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4 justify-center flex-wrap mb-12">
              <Button
                onClick={() => navigate("/auth/signup")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold shadow-lg"
                onMouseEnter={() => setHoveredButton("signup")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Get Started Free
              </Button>
              <Button
                onClick={() => navigate("/auth/signin")}
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg font-semibold border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                onMouseEnter={() => setHoveredButton("signin")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                Sign In
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 text-sm font-medium text-gray-700">
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">🔒</span>
                <span>Privacy First</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">✨</span>
                <span>Clean UI</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl mb-2">🤝</span>
                <span>Real Friends</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Why GraceNook?
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            We rethought social media from the ground up. Here's what makes us different.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="space-y-4">
              <div className="h-64 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">✨</h3>
                  <p className="text-sm">Clean Design</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Simple. No Clutter.</h3>
              <p className="text-gray-600">
                Clean, intuitive interface designed for genuine connections. Say goodbye to algorithm chaos and endless ads.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-4">
              <div className="h-64 bg-gradient-to-br from-purple-500 to-pink-400 rounded-xl flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">🔒</h3>
                  <p className="text-sm">Your Control</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Privacy First.</h3>
              <p className="text-gray-600">
                You control your data. Transparent privacy settings mean you decide who sees what, always.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-4">
              <div className="h-64 bg-gradient-to-br from-green-500 to-teal-400 rounded-xl flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">🤝</h3>
                  <p className="text-sm">Real Connections</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Connect Meaningfully.</h3>
              <p className="text-gray-600">
                Follow friends, join groups, message privately. All the tools you need, none of the noise.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="space-y-4">
              <div className="h-64 bg-gradient-to-br from-orange-500 to-red-400 rounded-xl flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">💰</h3>
                  <p className="text-sm">Fair & Transparent</p>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Ad-Supported, Not Ad-Obsessed.</h3>
              <p className="text-gray-600">
                We're transparent about ads. They help us stay free, but they won't dominate your feed.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 text-center border-t">
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to join?
        </h3>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Join thousands of people building genuine connections without the noise.
        </p>
        <Button
          onClick={() => navigate("/auth/signup")}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold"
        >
          Create Your Account
        </Button>
      </div>
    </div>
  );
}
