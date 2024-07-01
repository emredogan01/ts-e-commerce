import React from "react";
import { Skeleton } from "../ui/skeleton";

const CardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col border-2 border-gray w-[160px] h-[280px] justify-between p-1 rounded-md">
      <div className="relative w-full h-1/2">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="flex flex-col p-2 items-start justify-center gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
};

export default CardSkeleton;
