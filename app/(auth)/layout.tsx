"use client";

import React from "react";
import Link from "next/link";
import { BrainIcon } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Main Content */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-8 py-6">
        <header className="w-full mb-8 ">
          <nav className="flex gap-4 items-center">
            <BrainIcon className="w-6 h-6 text-black dark:text-white" />

            <Link href="/" className="flex flex-col">
              <span className="text-xl font-bold">MyBlog</span>
              <span className="text-xs ">Blogging Intelligence</span>
            </Link>
          </nav>
        </header>

        <main className="flex-1 w-full flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </main>

        <footer className="w-full mt-auto text-gray-500 text-sm py-6 flex flex-col sm:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link href="/privacy" className="hover:text-indigo-600 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-indigo-600 transition">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-indigo-600 transition">
              Contact
            </Link>
          </div>
        </footer>
      </div>

      {/* Image Section */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/auth.jpeg')",
        }}
      ></div>
    </div>
  );
}
