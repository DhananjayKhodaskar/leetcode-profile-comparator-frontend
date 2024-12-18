import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { Link } from "react-router-dom"
// import authImg from "../assets/E-LeetSquad.png";
import authImg from "../../assets/E-LeetSquad.png";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
      <div className="grid lg:grid-cols-2 w-full max-w-6xl gap-8 p-4">
        {/* Left side with illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-3xl" />
            <img
              src={authImg}
              alt="Cyberpunk illustration"
              className="relative z-10"
            />
          </div>
        </div>

        {/* Right side with content */}
        <div className="flex flex-col items-center justify-center p-8 text-center lg:text-left">
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              E-<span className="text-orange-500">Leet</span>Squad
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-400">
              Our elite team is working hard to bring you the ultimate coding experience. Stay tuned!
            </p>
            
            <div className="relative">
              <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-blue-500 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-orange-500 animate-pulse" />
              </div>
            </div>

            <div className="pt-4">
              <Link to="/auth/login">
                <Button className="w-full bg-orange-500 text-white hover:bg-orange-600 transition-colors">
                  Go to Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background code effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-5">
        <pre className="text-xs leading-6 text-white">
          {Array(50).fill(
            "function solve() { const dp = new Array(n).fill(0); for(let i = 0; i < n; i++) { dp[i] = Math.max(dp[i-1], nums[i]); } return dp[n-1]; }"
          ).join("\n")}
        </pre>
      </div>
    </div>
  )
}

