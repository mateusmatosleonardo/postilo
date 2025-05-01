import { auth } from "auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { deletePost, getUserPosts } from "@/actions";
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";

export default async function MyPostsPage() {
  const session = await auth();

  let userId = null;

  if (session) {
    userId = session.user.userId;
  } else {
    redirect("/");
  }

  const posts = await getUserPosts(userId);

  return (
    <div className="container mx-auto px-4 my-10">
      <h1 className="text-xl leading-5 font-semibold text-center mb-8">
        Minhas Publicações
      </h1>
      {posts.length === 0 ? (
        <div className="text-center">
          <p className="mb-4 font-medium">
            Você ainda não tem nenhuma postagem.
          </p>

          <div className="flex justify-center">
            <ButtonLink text="Criar nova postagem" href="/post/new" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto justify-items-center gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-zinc-300 p-4 rounded shadow-sm"
            >
              <Image
                src={post.imageUrl}
                alt={post.caption || "Post image"}
                className="w-[300px] h-[300px] object-cover mb-4 rounded"
                width={300}
                height={300}
              />
              {post.caption && (
                <p className="mb-2 text-sm font-medium">{post.caption}</p>
              )}
              <form action={deletePost}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="postId" value={post.id} />
                <div className="flex justify-end">
                  <Button type="submit" text="Excluir" danger={true} />
                </div>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
