import { auth, signIn, signOut } from "auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-white text-lg font-bold">
        Início
      </Link>
      <div>
        {session ? (
          <div className="flex gap-4 items-center">
            <p>{session.user?.name}</p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
                Sair
              </button>
            </form>
          </div>
        ) : (
          <form
          // action={async () => {
          //   "use server";
          //   await signIn("google", { callbackUrl: "/" });
          // }}
          >
            <Link
              href="/sign-in"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Entrar
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
