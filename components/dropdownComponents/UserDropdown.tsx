"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, PlusCircle, FileText, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutDialog } from "../dialogComponents/LogoutDialog";

export const UserDropdown = () => {
  const { logout } = useAuth();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setLogoutDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 p-2">
          <DropdownMenuItem>
            <Link href="/posts/create" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" /> Create Post
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> All Posts
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setLogoutDialogOpen(true)}
            className="flex items-center gap-2 text-red-500"
          >
            <LogOut className="h-4 w-4" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout Confirmation */}
      <LogoutDialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};
