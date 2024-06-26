import React from "react";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SubDescriptionFrom from "@/app/components/SubDescriptionFrom";
import { Cake, FileQuestion } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CreatePostCard from "@/app/components/CreatePostCard";
import PostCard from "@/app/components/PostCard";

import { unstable_noStore as noStore } from "next/cache";

async function getData(name: string) {
  noStore();
  const data = await prisma.subreddit.findUnique({
    where: {
      name: name,
    },
    select: {
      name: true,
      createdAt: true,
      description: true,
      userId: true,
      posts: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          title: true,
          imageString: true,
          id: true,
          textContent: true,
          comments: true,
          Vote: {
            select: {
              userId: true,
              voteType: true,
            },
          },
          User: {
            select: {
              userName: true,
            },
          },
        },
      },
    },
  });
  return data;
}

async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className=" max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10 max-sm:flex-col max-sm:p-4 max-sm:gap-y-3">
      <div className=" w-[65%] flex flex-col gap-y-5 max-sm:w-full ">
        <CreatePostCard subName={params.id} />
        {data?.posts.length === 0 ? (
          <div className=" flex flex-col min-h-[300px] justify-center items-center rounded-md border border-dashed p-8 text-center">
            <div className=" flex items-center justify-center size-20 rounded-full bg-primary/10">
              <FileQuestion className=" size-10 text-primary" />
            </div>
            <p className=" mt-6 text-xl font-semibold">
              No posts have been created yet.
            </p>
          </div>
        ) : (
          <>
            {data?.posts.map((post) => (
              <PostCard
                id={post.id}
                imageString={post.imageString}
                jsonContent={post.textContent}
                subName={data.name}
                title={post.title}
                userName={post.User?.userName as string}
                key={post.id}
                commentCount={post.comments.length}
                voteCount={post.Vote.reduce((acc, vote) => {
                  if (vote.voteType === "UP") return acc + 1;
                  if (vote.voteType === "DOWN") return acc - 1;
                  return acc;
                }, 0)}
              />
            ))}
          </>
        )}
      </div>
      <div className=" w-[35%] max-sm:w-full ">
        <Card>
          <div className=" bg-muted font-semibold p-4">About Community</div>
          <div className=" p-4 flex gap-x-3 items-center">
            <Image
              src={`https://avatar.vercel.sh/${data?.name}`}
              alt="Image of subreddit"
              width={60}
              height={60}
              className=" rounded-full size-16"
            />
            <Link href={`/r/${data?.name}`} className=" font-medium">
              r/{data?.name}
            </Link>
          </div>
          {user?.id === data?.userId ? (
            <SubDescriptionFrom
              description={data?.description}
              subName={params.id}
            />
          ) : (
            <p className=" text-sm text-secondary-foreground m-2">
              {data?.description}
            </p>
          )}
          <div className=" flex items-center gap-x-2 m-2 justify-center">
            <Cake className=" text-muted-foreground size-5" />
            <p className=" text-muted-foreground font-medium text-sm">
              Created :{" "}
              {new Date(data?.createdAt as Date).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                weekday: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <Separator className=" my-5" />
          <div className=" m-2">
            <Button asChild className="rounded-full w-full ">
              <Link
                href={user?.id ? `/r/${data?.name}/create` : "/api/auth/login"}
              >
                Create Post
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Page;
