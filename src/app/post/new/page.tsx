import { auth } from "auth";
import { redirect } from "next/navigation";
import CreatePostForm from "@/components/CreatePostForm";

export default async function NewPostPage() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <div className="w-[35rem] mx-auto p-4 my-10">
      <h1 className="text-xl leading-5 font-semibold text-center">
        Criar publicação
      </h1>
      <div className="border border-zinc-300 p-4 mt-8 rounded">
        <CreatePostForm />
      </div>
    </div>
  );
}
