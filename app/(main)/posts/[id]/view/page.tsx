"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, ArrowLeft, Heart, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { usePosts } from "@/hooks/usePosts";

export default function PostDetailPage() {
  const { id } = useParams();
  const { posts, loading } = usePosts();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<
    { id: number; name: string; text: string }[]
  >([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!loading) {
      const found = posts.find((p) => p.id === id);
      if (found) {
        setPost(found);
        setLikes(found.likes || Math.floor(Math.random() * 20) + 5);
        setComments(found.comments || []);
      }
    }
  }, [loading, id, posts]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      name: "You",
      text: commentText.trim(),
    };
    setComments((prev) => [...prev, newComment]);
    setCommentText("");
  };

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  if (loading || !post) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
      <div className="container mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 text-sm sm:text-base"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" /> Back
        </Button>

        {/* Post Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-md border border-border">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
                  <AvatarImage
                    src={post.authorImage || "/avatars/default.png"}
                  />
                  <AvatarFallback>
                    {post.author?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base">
                    {post.author || "Anonymous"}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {format(new Date(post.createdAt), "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-8 pt-0">
              <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-foreground leading-tight">
                {post.title}
              </h1>

              <div
                className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none leading-relaxed mb-6 sm:mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center gap-1"
                >
                  <Heart className="h-4 w-4 text-red-500" /> {likes}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" /> {comments.length}
                </Button>
              </div>

              <Separator className="my-4 sm:my-6" />

              {/* Comments Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4">
                  Comments
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4 sm:mb-6">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/avatars/default.png" />
                    <AvatarFallback>Y</AvatarFallback>
                  </Avatar>
                  <Input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1"
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  />
                  <Button
                    className="w-full sm:w-auto"
                    onClick={handleAddComment}
                  >
                    Post
                  </Button>
                </div>

                <div className="space-y-4">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex flex-col sm:flex-row gap-3 sm:items-start"
                      >
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                          <AvatarImage src="/avatars/default.png" />
                          <AvatarFallback>
                            {comment.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm sm:text-base">
                            {comment.name}
                          </span>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm sm:text-base">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
