import Link from "next/link";

type ButtonLinkProps = {
  text: string;
  href: string;
};

export default function ButtonLink({ text, href }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center w-fit h-8 bg-blue-800 hover:bg-blue-700 text-sm font-medium py-1 px-6 rounded text-white"
    >
      {text}
    </Link>
  );
}
