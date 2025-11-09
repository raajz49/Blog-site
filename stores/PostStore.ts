"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import { Post } from "@/lib/type";

interface PostStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
  createPost: (title: string, content: string) => Post;
  updatePost: (id: string, title: string, content: string) => Post;
  deletePost: (id: string) => void;
  resetPosts: () => void;
}

export const usePostStore = create<PostStore>()(
  persist(
    (set, get) => ({
      posts: [],
      loading: true,
      error: null,

      fetchPosts: async () => {
        set({ loading: true, error: null });
        try {
          const currentPosts = get().posts;

          if (currentPosts.length === 0) {
            const response = await fetch(
              process.env.NEXT_PUBLIC_API_URL as string
            );

            if (!response.ok) {
              throw new Error("Failed to fetch posts");
            }

            const data = await response.json();

            const transformedPosts: Post[] = data
              .slice(0, 20)
              .map((post: any) => ({
                id: post.id.toString(),
                title: post.title,
                content: post.body,
                author: `User ${post.userId}`,
                authorId: post.userId.toString(),
                tags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }));

            set({ posts: transformedPosts, loading: false });
          } else {
            set({ loading: false });
          }
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Failed to fetch posts",
            loading: false,
          });
        }
      },

      createPost: (title, content) => {
        const newPost: Post = {
          id: nanoid(),
          title,
          content,
          author: "Raj Koirala",
          authorId: "1",
          tags: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set({ posts: [newPost, ...get().posts] });
        return newPost;
      },

      updatePost: (id, title, content) => {
        const updatedPost = get().posts.map((p) =>
          p.id === id
            ? { ...p, title, content, updatedAt: new Date().toISOString() }
            : p
        );
        const post = updatedPost.find((p) => p.id === id)!;
        set({ posts: updatedPost });
        return post;
      },

      deletePost: (id) => {
        set({ posts: get().posts.filter((p) => p.id !== id) });
      },

      resetPosts: () => set({ posts: [] }),
    }),
    { name: "posts-storage" }
  )
);
