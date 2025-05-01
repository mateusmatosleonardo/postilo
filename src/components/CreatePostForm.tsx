"use client";

import { useFormState } from "react-dom";
import Label from "./Label";
import Button from "./Button";
import PostPreview from "./PostPreview";
import { createPost } from "@/actions";

export default function CreatePostForm() {
  const [formState, formAction] = useFormState(createPost, {
    message: "",
    type: "success",
  });

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        action={formAction}
        encType="multipart/form-data"
        method="POST"
      >
        <PostPreview />
        <div>
          <Label text="Conteúdo da publicação" htmlFor="caption" />
          <textarea
            id="caption"
            name="caption"
            placeholder="No que está pensando?"
            className="w-full p-2 text-sm border border-zinc-300 placeholder:text-ring-500 focus:ring-0 focus:outline-none rounded"
            rows={3}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <Button type="submit" text="Criar Post" />
        </div>
      </form>
    </div>
  );
}
