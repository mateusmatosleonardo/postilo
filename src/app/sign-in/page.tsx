import { signIn, providerMap } from "auth";

import { BsGoogle } from "react-icons/bs";

const icons = [
  {
    name: "Google",
    icon: <BsGoogle className="text-white" />,
  },
];

export default async function SignInPage() {
  const findIcon = (name: string) => {
    const icon = icons.find((item) => item.name === name);
    return icon?.icon ?? "";
  };

  return (
    <div className="w-1/2 mx-auto my-10 px-4 pt-2 pb-6 flex flex-col gap-2 rounded border border-gray-300">
      <h2 className="text-2xl leading-10 font-semibold text-center">
        Acesse ou crie sua conta
      </h2>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            await signIn(provider.id, { redirectTo: "/" });
          }}
          className="mt-6 flex justify-center"
        >
          <button className="flex items-center h-10 gap-2 px-6 py-1 rounded font-medium bg-blue-400 hover:bg-blue-500 duration-100">
            {findIcon(provider.name)}
            <span className="text-white">
              Entrar com o <strong>{provider.name}</strong>
            </span>
          </button>
        </form>
      ))}
    </div>
  );
}
