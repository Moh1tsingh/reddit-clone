"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "./lib/db";
import { redirect } from "next/navigation";
import { Prisma, TypeOfVote } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";

export async function updateUsername(prevData: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/api/auth/login");
  const username = formData.get("username") as string;
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        userName: username,
      },
    });

    return { message: "Username successfully updated!", status: "green" };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Username already taken", status: "error" };
      }
    }
    throw error;
  }
}

export async function createCommunity(prevData: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/api/auth/login");

  try {
    const name = formData.get("name") as string;

    const data = await prisma.subreddit.create({
      data: {
        name,
        userId: user.id,
      },
    });
    return redirect(`/r/${data.name}`);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return { message: "Community name already taken", status: "error" };
      }
    }
    throw error;
  }
}

export async function updateSubDescription(prevData: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/api/auth/login");

  const description = formData.get("description") as string;
  const name = formData.get("subName") as string;

  try {
    await prisma.subreddit.update({
      where: {
        name,
      },
      data: {
        description,
      },
    });
    return { message: "Description successfully updated!", status: "green" };
  } catch (error) {
    return { message: "Something went wrong!", status: "error" };
  }
}

export async function createPost(
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/api/auth/login");

  const title = formData.get("title") as string;
  const subName = formData.get("subName") as string;
  const imageUrl = formData.get("imageUrl") as string | null;

  const data = await prisma.post.create({
    data: {
      title,
      imageString: imageUrl ?? undefined,
      subName,
      userId: user.id,
      textContent: jsonContent ?? undefined,
    },
  });
  return redirect(`/post/${data.id}`);
}

export async function handleVote(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/api/auth/login");

  const postId = formData.get("postId") as string;
  const voteDirection = formData.get("voteDirection") as TypeOfVote;

  const vote = await prisma.vote.findFirst({
    where: {
      postId,
      userId: user.id,
    },
  });

  if (vote) {
    if (vote.voteType === voteDirection) {
      await prisma.vote.delete({
        where: {
          id: vote.id,
        },
      });
      return revalidatePath("/");
    } else {
      await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          voteType: voteDirection,
        },
      });
      return revalidatePath("/");
    }
  } else {
    await prisma.vote.create({
      data: {
        postId,
        userId: user.id,
        voteType: voteDirection,
      },
    });
    return revalidatePath("/");
  }
}

export async function createComment(formData:FormData){
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  if(!user) return redirect("/api/auth/login")
  
  try {
    const postId = formData.get("postId") as string;
    const text = formData.get("comment") as string;

    const data = await prisma.comment.create({
      data: {
        postId,
        userId: user.id,
        text,
      },
    });
    return revalidatePath(`/post/${postId}`);
  } catch (error) {
    console.log(error)
  }
  
}