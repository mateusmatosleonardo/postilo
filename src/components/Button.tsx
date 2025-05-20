"use client";

import { ComponentProps, ReactNode } from "react";
import { LuLoader } from "react-icons/lu";
import { useFormStatus } from "react-dom";

type ButtonProps = ComponentProps<"button"> & {
  text: string | ReactNode;
  danger?: boolean;
};

export default function Button({
  text,
  danger = false,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex items-center bg-blue-800 hover:bg-blue-700 h-8 text-sm font-medium py-1 px-6 gap-1 rounded text-white data-[danger=true]:bg-red-500 data-[danger=true]:hover:bg-red-400"
      data-danger={danger}
      disabled={pending || props.disabled}
      {...props}
    >
      {text}
      {pending && <LuLoader className="h-4 w-4 animate-spin" />}
    </button>
  );
}
