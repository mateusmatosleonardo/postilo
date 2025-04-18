import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  text: string;
  danger?: boolean;
};

export default function Button({
  text,
  danger = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className="flex items-center bg-blue-800 hover:bg-blue-700 h-8 text-sm font-medium py-1 px-6 rounded text-white data-[danger=true]:bg-red-500 data-[danger=true]:hover:bg-red-400"
      data-danger={danger}
      {...props}
    >
      {text}
    </button>
  );
}
