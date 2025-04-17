import { signIn, providerMap } from "auth";

import { BsGoogle } from "react-icons/bs";

const icons = [
  {
    name: "Google",
    icon: <BsGoogle />,
  },
];

export default async function SignInPage() {
  const findIcon = (name: string) => {
    const icon = icons.find((item) => item.name === name);
    return icon?.icon ?? "";
  };

  return (
    <div className="w-1/2 mx-auto my-10 px-4 flex flex-col gap-2">
      <h2 className="text-2xl leading-10 font-semibold text-center">
        Acesse ou crie sua conta com uma das opções disponíveis
      </h2>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            await signIn(provider.id, { redirectTo: "/" });
          }}
          className="mt-10 flex justify-center"
        >
          <button className="flex items-center h-10 gap-2 px-6 py-1 rounded font-medium border border-zinc-600 hover:bg-slate-50">
            {findIcon(provider.name)}
            <span>
              Entrar com o <strong>{provider.name}</strong>
            </span>
          </button>
        </form>
      ))}
    </div>
  );
}
