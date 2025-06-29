import { auth } from "auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/actions";
import Image from "next/image";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user?.email) return redirect("/");

  const user = await getUserByEmail(session.user.email);

  if (!user) return redirect("/");

  return (
    <div className="w-[35rem] mx-auto p-4">
      <>
        {user.image ? (
          <div className="w-full flex flex-col justify-center my-6 mb-4">
            <div className="mx-auto">
              <Image
                src={user.image}
                alt={`perfil de: ${user.name}`}
                className="w-36 h-36 rounded-full object-cover"
                width={144}
                height={144}
                quality={100}
                priority={true}
              />
            </div>
            <ProfileForm user={user} />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center my-6">
            <div className="w-36 h-36 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">
              {user?.name && user.name[0].toUpperCase()}
            </div>
            <ProfileForm user={user} />
          </div>
        )}
      </>
    </div>
  );
}
