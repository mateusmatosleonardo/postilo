"use client";

import React, { useState } from "react";
import { Post as PostType } from "types/Post";
import { FiMessageSquare } from "react-icons/fi";
import Image from "next/image";
import LikeButton from "./Post/LikeButton";
import CommentModal from "./Post/CommentModal";

interface PostProps {
  post: PostType;
  currentUserId?: string;
}

export default function Post({ post, currentUserId }: PostProps) {
  let isLiked = false;

  if (post.likes) {
    isLiked = post.likes.some((like) => like.userId === currentUserId);
  }

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  return (
    <div className="w-fit mx-auto mb-6 p-4 border border-zinc-300 rounded">
      <Image
        src={post.imageUrl}
        alt={post.caption || "Imagem sem legenda"}
        className="w-[460px] h-[460px] object-cover mb-4 rounded"
        width={460}
        height={460}
      />
      {post.caption && (
        <p className="mb-4 text-sm font-medium w-full max-w-[450px]">{post.caption}</p>
      )}
      <div className="flex items-center">
        {post.user.image && (
          <Image
            src={post.user.image}
            alt={`${post.user.name}'s profile`}
            className="w-10 h-10 object-cover rounded-full mr-3"
            width={40}
            height={40}
          />
        )}
        <p className="text-sm font-medium">{post.user.name}</p>
      </div>
      <div className="flex items-center mt-4">
        <LikeButton
          postId={post.id}
          initialLikesCount={post.likes?.length ? post.likes.length : 0}
          isLiked={isLiked}
          currentUserId={currentUserId}
        />
        <button
          className="flex items-center gap-x-1.5 ml-3"
          onClick={() => setIsCommentModalOpen(true)}
        >
          <FiMessageSquare className="w-5 h-5 text-gray-500" />
          <span>{post.comments ? post.comments.length : 0}</span>
        </button>
      </div>
      <CommentModal
        post={post}
        currentUserId={currentUserId}
        isOpen={isCommentModalOpen}
        onRequestClose={() => setIsCommentModalOpen(false)}
      />
    </div>
  );
}
