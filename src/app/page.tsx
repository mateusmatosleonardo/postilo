import { auth } from "auth";
import { getAllPosts } from "@/actions";
import { redirect } from "next/navigation";
import Post from "@/components/Post";

export default async function Home() {
  const posts = await getAllPosts();

  const session = await auth();

  let userId = null;

  if (session) {
    userId = session.user.userId;
  } else {
    redirect("/sign-in");
  }

  return (
    <main className="flex flex-col min-h-screen p-4">
      <div>
        {posts && posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <Post post={post} currentUserId={userId} key={post.id} />
            ))}
          </div>
        ) : (
          <p>Ainda não há publicações</p>
        )}
      </div>
    </main>
  );
}
