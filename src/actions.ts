"use server";

import { auth } from "auth";
import { redirect } from "next/navigation";

import { PrismaClient } from "@prisma/client";

import { User } from "@prisma/client";

import path from "path";
import { promises as fs } from "fs";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

type FormState = {
  message: string;
  type: string;
};

export async function getUserByEmail(
  email: string | null
): Promise<User | null> {
  if (!email) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
}

export async function updateUserProfile(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();

  if (!session) redirect("/");

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const imageFile = formData.get("image") as File;

  if (session.user.userId !== id) {
    throw new Error("Unauthorized access");
  }

  let imageUrl;

  if (imageFile && imageFile.name !== "undefined") {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, imageFile.name);

    const arrayBuffer = await imageFile.arrayBuffer();

    await fs.writeFile(filePath, Buffer.from(arrayBuffer));

    imageUrl = `/uploads/${imageFile.name}`;
  }

  const dataToUpdate = imageUrl ? { name, image: imageUrl } : { name };

  await prisma.user.update({
    where: {
      id,
    },
    data: dataToUpdate,
  });

  revalidatePath("/profile");

  return {
    message: "Perfil atualizado com sucesso!",
    type: "success",
  };
}

export async function createPost(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();

  if (!session) redirect("/");

  const caption = formData.get("caption") as string;
  const imageFile = formData.get("image") as File;

  if (!caption || imageFile.size === 0) {
    return {
      message: "Legenda e foto são obrigatórios",
      type: "error",
    };
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  await fs.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, imageFile.name);

  const arrayBuffer = await imageFile.arrayBuffer();

  await fs.writeFile(filePath, Buffer.from(arrayBuffer));

  const imageUrl = `/uploads/${imageFile.name}`;

  await prisma.post.create({
    data: {
      imageUrl,
      caption,
      userId: session.user.userId,
    },
  });

  revalidatePath("/profile");

  redirect("/");
}

export async function getUserPosts(userId: string) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  if (session.user.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  return await prisma.post.findMany({
    where: { userId },
    include: {
      user: true,
      likes: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getAllPosts() {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      likes: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });
}

export async function deletePost(formData: FormData) {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const userId = formData.get("userId") as string;
  const postId = formData.get("postId") as string;

  if (session.user.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  await prisma.post.delete({
    where: { id: postId },
  });

  revalidatePath("/my-posts");
}

export async function likePost(postId: string, userId: string): Promise<void> {
  const session = await auth();

  if (!session) redirect("/");

  if (session.user.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  const existingLike = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  }

  await prisma.like.create({
    data: {
      postId,
      userId,
    },
  });

  revalidatePath("/");
}

export async function commentPost(
  postId: string,
  userId: string,
  content: string
) {
  const session = await auth();

  if (!session) redirect("/");

  if (session.user.userId !== userId) {
    throw new Error("Unauthorized access");
  }

  await prisma.comment.create({
    data: {
      postId,
      userId,
      content,
    },
  });

  revalidatePath("/");
}
