"use client";

import { useState } from "react";
import { likePost } from "@/actions";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";

interface LikeButtonProps {
  postId: string;
  initialLikesCount: number;
  isLiked: boolean;
  currentUserId?: string;
}

export default function LikeButton({
  postId,
  initialLikesCount,
  isLiked,
  currentUserId,
}: LikeButtonProps) {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [liked, setLiked] = useState(isLiked);

  async function handleLike() {
    if (!currentUserId) {
      window.location.href = "/sign-in";
      return;
    }

    await likePost(postId, currentUserId);

    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  }

  return (
    <div className="flex items-center gap-x-1.5">
      <button onClick={handleLike}>
        {liked ? (
          <BsFillHeartFill className="w-5 h-5 text-red-500" />
        ) : (
          <BsHeart className="w-5 h-5 text-gray-500" />
        )}
      </button>
      <span>{likesCount}</span>
    </div>
  );
}
