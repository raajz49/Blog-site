"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePosts } from "@/hooks/usePosts";
import { usePagination } from "@/hooks/usePagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import { ViewToggle } from "@/components/dashboard/ViewToggle";
import { CardView } from "@/components/dashboard/CardView";
import { TableView } from "@/components/dashboard/TableView";
import { PaginationControls } from "@/components/dashboard/PaginationController";

export default function DashboardPage() {
  const { posts, loading, deletePost } = usePosts();
  const [view, setView] = useState<"card" | "table">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [pageBeforeSearch, setPageBeforeSearch] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredPosts = useMemo(() => {
    if (!debouncedSearch.trim()) return posts;

    const query = debouncedSearch.toLowerCase();
    return posts.filter((post) => post.title.toLowerCase().includes(query));
  }, [posts, debouncedSearch]);

  const itemsPerPage = view === "card" ? 9 : 10;

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    hasNext,
    hasPrev,
  } = usePagination(filteredPosts, itemsPerPage);

  useEffect(() => {
    if (debouncedSearch) {
      if (!searchQuery || searchQuery === debouncedSearch) {
        setPageBeforeSearch(currentPage);
      }
      goToPage(1);
    } else {
      goToPage(pageBeforeSearch);
    }
  }, [debouncedSearch]);

  const handleDelete = async (id: string) => {
    await deletePost(id);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedSearch("");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 md:gap-0">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">My Blog Posts</h1>
          <p className="text-muted-foreground mt-1 md:mt-2">
            Manage and organize your blog posts
          </p>
        </div>

        <div className="flex flex-row justify-between items-center gap-2">
          <ViewToggle view={view} setView={setView} />
          <Link href="/posts/create">
            <Button className="w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search posts by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        {debouncedSearch && (
          <p className="text-sm text-muted-foreground mt-2">
            Found {filteredPosts.length} result
            {filteredPosts.length !== 1 ? "s" : ""} for &quot;{debouncedSearch}
            &quot;
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {debouncedSearch
              ? `No posts found matching "${debouncedSearch}"`
              : "No posts yet"}
          </p>
          {debouncedSearch && (
            <Button variant="outline" className="mt-4" onClick={clearSearch}>
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <>
          {view === "card" ? (
            <CardView posts={paginatedItems} onDelete={handleDelete} />
          ) : (
            <TableView posts={paginatedItems} onDelete={handleDelete} />
          )}

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            hasNext={hasNext}
            hasPrev={hasPrev}
          />
        </>
      )}
    </div>
  );
}
