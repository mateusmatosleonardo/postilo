import { auth } from "auth";

export default async function ServerPage() {
  const session = await auth();

  if (!session || !session.user) return <p>Você precisa estar autenticado</p>;

  return (
    <div>
      <h1>Componente Server Autenticado</h1>
    </div>
  );
}
