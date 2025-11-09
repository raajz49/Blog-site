"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard, MessageSquare, Film } from "lucide-react";

export const ProjectsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm flex items-center gap-2"
        >
          My Projects
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link
            href="https://stage-ott.rajkoirala.com.np/"
            className="flex items-center gap-2 w-full"
            target="_blank"
          >
            <Clapperboard className="h-4 w-4 text-blue-500" />
            <span>StreamVerse (OTT App)</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="https://chatspark.rajkoirala.com.np/"
            className="flex items-center gap-2 w-full"
            target="_blank"
          >
            <MessageSquare className="h-4 w-4 text-green-500" />
            <span>ChatSpark (Chat App)</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="https://rmdb.rajkoirala.com.np/"
            className="flex items-center gap-2 w-full"
            target="_blank"
          >
            <Film className="h-4 w-4 text-orange-500" />
            <span>RMDB Movies</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
