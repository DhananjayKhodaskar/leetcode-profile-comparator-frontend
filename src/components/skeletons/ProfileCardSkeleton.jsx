import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AuthHeaderSkeleton from "./AuthHeaderSkeleton";

const ProfileCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 w-80">
      <AuthHeaderSkeleton />
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex flex-col space-y-2 w-full">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-full" />

        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-full" />

        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-full" />

        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-full" />

        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-full" />

        {/* Uncomment the following lines if you plan to add the total submissions section */}
        {/* <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-8 w-full" /> */}
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
