import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
      <div className="grid lg:grid-cols-2 w-full max-w-6xl gap-8 p-4">
        {/* Left side with illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F49D03]/20 to-blue-500/20 blur-3xl" />
            <img
              src="https://raw.githubusercontent.com/DhananjayKhodaskar/assets/refs/heads/main/E-LeetSquad.png"
              alt="Cyberpunk illustration"
              className="relative z-10"
            />
          </div>
        </div>

        {/* Right side with content */}
        <div className="flex flex-col items-center justify-center p-8 text-center lg:text-left">
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              E-<span className="text-[#F49D03]">Leet</span>Squad
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-white/90">
              Landing Page Coming Soon...
            </h2>
            <p className="text-lg text-gray-400">
              The landing page is currently under development, but here&apos;s a sneak peek:
              Get ready to revolutionize your DSA problem-solving journey! Solve
              DSA sheets like the NeetCode 150 and collaborate with friends— say
              goodbye to tackling them alone. Create custom challenges by
              uploading your own problem set in Excel, mark problems as solved
              with a click, or sync problems directly from your LeetCode
              account. 🚀
            </p>

            <div className="relative">
              <div className="h-1 w-full bg-gradient-to-r from-[#F49D03] to-blue-500 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-[#F49D03] animate-pulse" />
              </div>
            </div>

            <div className="pt-4">
              <Link to="/auth/login">
                <Button className="w-full bg-[#F49D03] text-white hover:bg-[#F49D03] transition-colors animate-bounce">
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
          {Array(50)
            .fill(
              "function solve() { const dp = new Array(n).fill(0); for(let i = 0; i < n; i++) { dp[i] = Math.max(dp[i-1], nums[i]); } return dp[n-1]; }"
            )
            .join("\n")}
        </pre>
      </div>
    </div>
  );
}
