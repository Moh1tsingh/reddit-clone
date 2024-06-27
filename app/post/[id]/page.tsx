import { handleVote } from "@/app/actions";
import CommentsSection from "@/app/components/CommentsSection";
import CopyLink from "@/app/components/CopyLink";
import RenderToJson from "@/app/components/RenderToJson";
import SubDescriptionFrom from "@/app/components/SubDescriptionFrom";
import { DownVoteButton, UpVoteButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cake, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import { unstable_noStore as noStore } from "next/cache";

async function getData(id: string) {
  noStore();
  const data = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      createdAt: true,
      title: true,
      imageString: true,
      textContent: true,
      subName: true,
      Vote: {
        select: {
          voteType: true,
        },
      },
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          User: {
            select: {
              userName: true,
              imageUrl: true,
            },
          },
        },
      },
      subreddit: {
        select: {
          name: true,
          createdAt: true,
          description: true,
        },
      },
      User: {
        select: {
          userName: true,
        },
      },
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

async function page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return (
    <div className=" max-w-[1000px] mx-auto flex  gap-x-10 mt-4 mb-10 max-sm:flex-col max-sm:p-4 max-sm:gap-y-3">
      <div className=" w-[70%] max-sm:w-full flex flex-col gap-y-5">
        <Card className=" p-2 flex max-sm:p-0">
          <div className=" flex flex-col items-center gap-y-2 p-2 max-sm:p-1 max-sm:bg-muted">
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value={"UP"} />
              <input type="hidden" name="postId" value={data.id} />
              <UpVoteButton />
            </form>
            {data.Vote.reduce((acc, vote) => {
              if (vote.voteType === "UP") return acc + 1;
              if (vote.voteType === "DOWN") return acc - 1;
              return acc;
            }, 0)}
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value={"DOWN"} />
              <input type="hidden" name="postId" value={data.id} />
              <DownVoteButton />
            </form>
          </div>
          <div className=" p-2 w-full">
            <p className=" text-xs text-muted-foreground">
              Post by u/{data.User?.userName}
            </p>
            <h1 className=" mt-1 font-medium text-lg">{data.title}</h1>
            <div className=" -ml-3">
              {data.textContent && <RenderToJson data={data.textContent} />}
            </div>
            {data.imageString && (
              <Image
                src={data.imageString}
                alt="Post Image"
                width={650}
                height={300}
                className=" mt-2 rounded-sm object-contain w-full h-auto"
              />
            )}
            <div className="m-3 flex items-center gap-x-5">
              <div className=" flex gap-x-1  items-center">
                <MessageCircle className="size-4 text-muted-foreground" />
                <p className=" font-medium text-muted-foreground text-xs">
                  {data.comments.length} Comments
                </p>
              </div>
              <CopyLink id={data.id} />
            </div>
            <CommentsSection postId={data.id} />
            <Separator className=" my-5" />
            <div className=" flex flex-col gap-y-7">
              {data.comments.map((comment) => (
                <div key={comment.id} className="flex flex-col">
                  <div className=" flex items-center  gap-x-3 ">
                    <Image
                      src={
                        comment.User?.imageUrl
                          ? comment.User?.imageUrl
                          : "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
                      }
                      alt=""
                      className=" size-7 rounded-full"
                      width={40}
                      height={40}
                    />
                    <h3 className=" text-sm font-medium tracking-tight">
                      u/{comment.User?.userName}
                    </h3>
                  </div>
                  <p className=" ml-10 text-secondary-foreground text-sm tracking-wide">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
      <div className=" w-[30%] max-sm:w-full">
        <Card>
          <div className=" bg-muted font-semibold p-4">About Community</div>
          <div className=" p-4 flex gap-x-3 items-center">
            <Image
              src={`https://avatar.vercel.sh/${data?.subName}`}
              alt="Image of subreddit"
              width={60}
              height={60}
              className=" rounded-full size-16"
            />
            <Link href={`/r/${data?.subName}`} className=" font-medium">
              r/{data?.subName}
            </Link>
          </div>

          <p className=" text-sm text-secondary-foreground m-2">
            {data?.subreddit?.description}
          </p>

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
              <Link href={`/r/${data?.subName}/create`}>Create Post</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default page;
