"use client";

import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="rounded-full bg-muted p-6 mb-6">
        <FileText className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No Posts Yet</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-md">
        You haven’t created any posts yet. Start by writing your first article!
      </p>
      <Link href="/posts/create">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Your First Post
        </Button>
      </Link>
    </motion.div>
  );
}
