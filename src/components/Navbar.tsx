import Image from "next/image";
import { auth, signOut } from "auth";
import Link from "next/link";
import { getUserByEmail } from "@/actions";
import { FaPlusCircle } from "react-icons/fa";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

export default async function Navbar() {
  const session = await auth();

  const user = await getUserByEmail(session?.user.email);

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link
        href="/"
        className="text-white hover:text-zinc-200 text-lg font-bold"
      >
        Postilo
      </Link>
      <div>
        {user ? (
          <div className="flex gap-4 items-center">
            <Link
              href="/post-new"
              className="font-medium text-white hover:text-zinc-200"
            >
              <FaPlusCircle className="text-white" size={20} />
            </Link>
            <Link
              href="/profile"
              className="font-medium text-white hover:text-zinc-200"
            >
              Perfil
            </Link>
            <Link
              href="/my-posts"
              className="font-medium text-white hover:text-zinc-200"
            >
              Meus posts
            </Link>
            <p className="font-medium text-white">{user.name}</p>
            {user.image && (
              <Image
                src={user.image}
                alt={`perfil de: ${user.name}`}
                className="w-10 h-10 rounded-full"
                width={40}
                height={40}
              />
            )}
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button text="Sair" danger={true} type="submit" />
            </form>
          </div>
        ) : (
          <form>
            <ButtonLink text="Entrar" href="/sign-in" />
          </form>
        )}
      </div>
    </div>
  );
}
