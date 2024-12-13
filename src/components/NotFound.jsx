import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1b36] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:50px_50px] opacity-20"></div>
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_800px_at_100%_200px,rgba(255,166,0,0.1),transparent)]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <Terminal className="w-16 h-16 mx-auto mb-8 text-orange-500" />

        <h1 className="text-7xl font-bold text-white mb-4 font-mono">
          <span className="text-orange-500">404</span> Error
        </h1>

        <div className="mb-8 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
          <pre className="text-sm md:text-base font-mono text-slate-300 text-left">
            <code>{`> ERROR: Page not found
> LOCATION: ${
              typeof window !== "undefined" ? window.location.pathname : ""
            }
> STATUS: 404
> MESSAGE: The requested resource could not be found
> SUGGESTION: Try navigating back to home`}</code>
          </pre>
        </div>

        <p className="text-slate-400 mb-8 text-lg">
          Looks like our we couldn&apos;t find what you&apos;re looking
          for. Time to return to base.
        </p>

        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 rounded-lg text-lg font-medium transition-all hover:scale-105"
          onClick={() => navigate("/auth/login")}
        >
          Return to Login Page
        </Button>
      </div>

      {/* Decorative code blocks */}
      <div className="hidden lg:block absolute top-20 left-20 transform -rotate-12">
        <pre className="text-xs text-blue-400/30 font-mono">
          {`class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        bool flag = false;
        for(int i =0;i<nums.size();i++){
            for(int j=i+1;j<nums.size();j++){
                if(nums[i] == nums[j]) return true;
            }
        }
        return flag;
    }
};`}
        </pre>
      </div>

      <div className="hidden lg:block absolute bottom-20 right-20 transform rotate-12">
        <pre className="text-xs text-blue-400/30 font-mono">
          {`class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)
        for i in range(n - 1):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return []  # No solution found`}
        </pre>
      </div>
    </div>
  );
};

export default NotFound;
