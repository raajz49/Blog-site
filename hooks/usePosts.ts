"use client";

import { usePostStore } from "@/stores/PostStore";
import { useEffect } from "react";

export const usePosts = () => {
  const posts = usePostStore((state) => state.posts);
  const loading = usePostStore((state) => state.loading);
  const error = usePostStore((state) => state.error);
  const fetchPosts = usePostStore((state) => state.fetchPosts);
  const createPost = usePostStore((state) => state.createPost);
  const updatePost = usePostStore((state) => state.updatePost);
  const deletePost = usePostStore((state) => state.deletePost);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    refetch: fetchPosts,
  };
};
