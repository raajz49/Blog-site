"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { UserDropdown } from "./dropdownComponents/UserDropdown";
import { ProjectsDropdown } from "./dropdownComponents/ProjectDropdown";
import { BrainIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ModeToggle } from "./toggle";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-background border-b shadow-sm">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 items-center">
            <BrainIcon className="w-6 h-6 text-black dark:text-white" />

            <Link href="/" className="flex flex-col">
              <span className="text-xl font-bold">MyBlog</span>
              <span className="text-xs ">Blogging Intelligence</span>
            </Link>
          </nav>
          <ModeToggle />
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="https://www.rajkoirala.com.np/"
            target="_blank"
            className="text-sm font-medium hover:text-primary"
          >
            About Me
          </Link>

          <ProjectsDropdown />

          <Link
            href="https://www.rajkoirala.com.np/#contact"
            target="_blank"
            className="text-sm font-medium hover:text-primary"
          >
            Contact Me
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="w-8 h-8">
            {user?.avatarUrl ? (
              <AvatarImage
                src={user.avatarUrl}
                alt={user.name || "User Avatar"}
              />
            ) : (
              <AvatarFallback>
                {user?.name ? (
                  user.name[0].toUpperCase()
                ) : (
                  <UserIcon className="w-4 h-4" />
                )}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm font-medium text-muted-foreground">
            {user?.name}
          </span>
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
