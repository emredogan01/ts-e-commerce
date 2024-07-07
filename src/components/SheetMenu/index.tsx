import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SheetMenuProps {
  title: string;
  side: "left" | "right" | "top" | "bottom";
  children: React.ReactNode;
  triggerIcon: React.ReactNode;
  [key: string]: any;
}

const SheetMenu: React.FC<SheetMenuProps> = ({
  title,
  children,
  side,
  triggerIcon,
  ...rest
}) => {
  return (
    <Sheet {...rest}>
      <SheetTrigger className="">{triggerIcon}</SheetTrigger>
      <SheetContent className="overflow-y-auto" side={side}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
