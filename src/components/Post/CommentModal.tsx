"use client";

import React, { useState } from "react";
import { Post as PostType } from "types/Post";
import Modal from "react-modal";
import Button from "../Button";
import { commentPost } from "@/actions";
import { MdClose } from "react-icons/md";
import Image from "next/image";

interface CommentModalProps {
  post: PostType;
  currentUserId?: string;
  isOpen: boolean;
  onRequestClose: VoidFunction;
}

export default function CommentModal(props: CommentModalProps) {
  const [content, setContent] = useState("");

  async function handleAddComment() {
    if (!props.currentUserId) {
      window.location.href = "/";
      return;
    }

    if (!content.trim()) {
      return;
    }

    await commentPost(props.post.id, props.currentUserId, content);

    setContent("");
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="Comentários"
      ariaHideApp={false}
      className="w-[564px] mt-[5.5rem] mx-auto bg-white rounded border border-zinc-300"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Comentários</h2>
          <button
            className="p-1 rounded-full bg-red-600 hover:bg-red-400 text-white"
            onClick={props.onRequestClose}
          >
            <MdClose />
          </button>
        </div>
        <div className="flex flex-col mb-4">
          {props.post.comments && props.post.comments.length > 0 ? (
            props.post.comments.map((comment) => (
              <div className="flex items-center mb-2" key={comment.id}>
                {comment.user.image && (
                  <Image
                    src={comment.user.image}
                    alt={`Imagem do usuário ${props.post.user.name}`}
                    width={30}
                    height={30}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                )}
                <p className="text-sm">
                  <strong>{comment.user.name}: </strong>
                  {comment.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm">Nenhum comentário ainda.</p>
          )}
        </div>
        {props.currentUserId && (
          <div className="flex flex-col mb-4 gap-6">
            <textarea
              className="w-full h-32 p-2 text-sm rounded border border-zinc-300"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Adicione um comentário"
            ></textarea>
            <div className="div flex justify-end">
              <Button type="button" text="Comentar" onClick={handleAddComment} />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
