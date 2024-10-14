import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AuthHeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="h-6 w-[200px]" />
      <Skeleton className="h-4 w-[150px]" />
    </div>
  );
};

export default AuthHeaderSkeleton;
