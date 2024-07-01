import React from "react";
import { FaUserCircle, FaSignOutAlt, FaLayerGroup } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DrawerSide: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-around outline-none w-full h-full">
        <span>User</span>
        <FaUserCircle size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex item-center gap-2 justify-between cursor-pointer">
          <span>Settings</span>
          <IoSettings size={15} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 items-center justify-between cursor-pointer">
          <span>Billing</span>
          <FaLayerGroup size={15} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 items-center justify-between cursor-pointer">
          <span>Logout</span>
          <FaSignOutAlt size={15} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DrawerSide;
