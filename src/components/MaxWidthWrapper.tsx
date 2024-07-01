import React from "react";
import { ReactNode } from "react";

const MaxWidthWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={`h-full w-full mx-auto max-w-screen-xl ${className || ""}`}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
