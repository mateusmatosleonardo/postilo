"use client";

import { useFormState } from "react-dom";
import { User } from "types/User";
import { updateUserProfile } from "@/actions";
import Label from "./Label";
import Button from "./Button";
import ImagePreview from "./ImagePreview";

type ProfileFormProps = {
  user: User;
};

export default function ProfileForm({ user }: ProfileFormProps) {
  const [formState, formAction] = useFormState(updateUserProfile, {
    message: "",
    type: "success",
  });

  return (
    <div>
      {formState.message && (
        <div className="w-full mb-4">
          <p
            className={`${
              formState.type === "success" ? "text-green-500" : "text-red-500"
            } text-sm font-bold`}
          >
            {formState.message}
          </p>
        </div>
      )}
      <form
        className="flex flex-col gap-4"
        action={formAction}
        encType="multipart/form-data"
        method="POST"
      >
        <input type="hidden" name="id" value={user.id} />
        <div>
          <Label text="Nome" htmlFor="name" />
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite o seu nome"
            className="w-full p-2 text-sm border border-zinc-300 placeholder:text-ring-500 focus:ring-0 focus:outline-none rounded"
            defaultValue={user.name || ""}
          />
        </div>
        <ImagePreview />
        <div className="flex justify-end">
          <Button type="submit" text="Salvar" />
        </div>
      </form>
    </div>
  );
}
