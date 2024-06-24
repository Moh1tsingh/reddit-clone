import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import CopyLink from "./CopyLink";
import { handleVote } from "../actions";
import { DownVoteButton, UpVoteButton } from "./SubmitButton";
import RenderToJson from "./RenderToJson";

interface iAppsProps {
  title: string;
  jsonContent: any;
  //   createdAt: String;
  imageString: string | null;
  subName: string;
  id: string;
  voteCount: number;
  userName: string;
  commentCount:number
}

function PostCard({
  id,
  imageString,
  jsonContent,
  subName,
  title,
  userName,
  voteCount,
  commentCount
}: iAppsProps) {
  return (
    <Card className=" flex relative overflow-hidden">
      <div className=" flex flex-col items-center gap-y-2 bg-muted p-2">
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value={"UP"} />
          <input type="hidden" name="postId" value={id} />
          <UpVoteButton />
        </form>
        {voteCount}
        <form action={handleVote}>
          <input type="hidden" name="voteDirection" value={"DOWN"} />
          <input type="hidden" name="postId" value={id} />
          <DownVoteButton />
        </form>
      </div>
      <div>
        <div className="flex items-center gap-x-2 p-2">
          <Link href={`/r/${subName}`} className=" font-semibold text-xs">
            r/{subName}
          </Link>
          <p className=" text-xs text-muted-foreground">
            Posted by: <span className="hover:text-primary">u/{userName}</span>
          </p>
        </div>
        <div className="px-2">
          <Link href={`/post/${id}`}>
            <h1 className=" font-medium text-lg mt-1 ">{title}</h1>
          </Link>
        </div>
        <div className=" max-h-[300px] overflow-hidden">
          {imageString ? (
            <Link href={`/post/${id}`}>
              <Image
                src={imageString}
                alt="Post Image"
                width={625}
                height={300}
                className=" w-full h-full"
              />
            </Link>
          ) : (
            <RenderToJson data={jsonContent} />
          )}
        </div>
        <div className="m-3 flex items-center gap-x-5">
          <div className=" flex gap-x-1  items-center">
            <MessageCircle className="size-4 text-muted-foreground" />
            <p className=" font-medium text-muted-foreground text-xs">
              {commentCount} Comments
            </p>
          </div>
          <CopyLink id={id} />
        </div>
      </div>
    </Card>
  );
}

export default PostCard;
