import { ComponentProps } from "react";

type LabelProps = ComponentProps<"label"> & {
  text: string;
};

export default function Label({ text, ...props }: LabelProps) {
  return (
    <label className="text-sm font-medium text-black mb-1" {...props}>
      {text}
    </label>
  );
}
