import { Card } from "@/components/ui/card";
import Image from "next/image";
import banner from "../public/banner.png";
import heroImage from "../public/hero-image.png";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreatePostCard from "./components/CreatePostCard";
import prisma from "./lib/db";
import PostCard from "./components/PostCard";
import { Suspense } from "react";
import SuspenseCard from "./components/SuspenseCard";
import Pagination from "./components/Pagination";

async function getData(searchParams:string) {
  const [count , data] = await prisma.$transaction([
    prisma.post.count(),
    prisma.post.findMany({
    take: 5,
    skip:searchParams ? (Number(searchParams)- 1) * 5 : 0,
    select: {
      title: true,
      textContent: true,
      createdAt: true,
      subName: true,
      id: true,
      imageString: true,
      User: {
        select: {
          userName: true,
        },
      },
      Vote: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
])
return {data,count};
}

export default function Home({searchParams}:{searchParams:{page:string}}) {
  return (
    <div className=" max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className=" w-[65%] flex flex-col gap-y-5">
        <CreatePostCard />
        <Suspense fallback={<SuspenseCard />} key={searchParams.page}>
          <ShowItems searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="w-[35%]">
        <Card>
          <Image src={banner} alt="banner" />
          <div className="p-2">
            <div className=" flex items-center">
              <Image
                src={heroImage}
                alt="heroImage"
                className=" w-10 h-16 -mt-7"
              />
              <h1 className="font-medium pl-3">Home</h1>
            </div>
            <p className=" text-sm text-muted-foreground pt-2">
              Your Reddit Homepage, Come here to check in with your favorite
              communities!
            </p>
            <Separator className="my-5" />
            <div className=" flex w-full flex-col gap-y-3">
              <Button variant={"secondary"} asChild>
                <Link href={"/r/dump/create"}>Create Post</Link>
              </Button>
              <Button asChild>
                <Link href={"/r/create"}>Create Community</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

async function ShowItems({ searchParams }: { searchParams: { page: string } }) {
  const { count, data } = await getData(searchParams.page);

  return (
    <>
      {data.map((post) => {
        return (
          <PostCard
            id={post.id}
            imageString={post.imageString}
            jsonContent={post.textContent}
            subName={post.subName}
            title={post.title}
            userName={post.User?.userName as string}
            voteCount={post.Vote.reduce((acc, vote) => {
              if (vote.voteType === "UP") return acc + 1;
              if (vote.voteType === "DOWN") return acc - 1;
              return acc;
            }, 0)}
            key={post.id}
          />
        );
      })}
      <Pagination totalPages={Math.ceil(count / 5)} />
    </>
  );
}
