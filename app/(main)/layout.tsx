"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

interface PostLayoutProps {
  children: ReactNode;
}

export default function PostLayout({ children }: PostLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
