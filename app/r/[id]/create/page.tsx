"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import pfp from "../../../../public/pfp.png";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/app/components/TipTapEditor";
import { SubmitButton } from "@/app/components/SubmitButton";
import { UploadDropzone } from "@/app/components/Uploadthing";
import { createPost } from "@/app/actions";
import { JSONContent } from "@tiptap/react";

const rules = [
  {
    id: 1,
    text: "Remember your human.",
  },
  {
    id: 2,
    text: "Behave like you would in real life.",
  },
  {
    id: 3,
    text: "Look for original source of content.",
  },
  {
    id: 4,
    text: "Search for duplication before posting.",
  },
  {
    id: 5,
    text: "Read the community guidelines.",
  },
];

function page({ params }: { params: { id: string } }) {
  const [imageUrl, SetImageUrl] = useState<string | null>(null);
  const [json, SetJson] = useState<null | JSONContent>(null);
  const [title, SetTitle] = useState<string | null>(null);
  const createPostReddit = createPost.bind( null, {jsonContent:json} )

  return (
    <div className=" max-w-[1000px] mx-auto flex gap-x-10 mt-4">
      <div className=" w-[65%] flex flex-col gap-y-5">
        <h1 className=" font-semibold">
          Subreddit:
          <Link href={`/r/${params.id}`} className=" text-primary">
            r/{params.id}
          </Link>
        </h1>
        <Tabs defaultValue="post" className="w-full">
          <TabsList className=" w-full grid grid-cols-2">
            <TabsTrigger value="post">
              <Text className="size-4 mr-2" />
              Post
            </TabsTrigger>
            <TabsTrigger value="image">
              <Video className="size-4 mr-2" />
              Image & Video
            </TabsTrigger>
          </TabsList>
          <TabsContent value="post">
            <Card>
              <form action={createPostReddit}>
                <input
                  type="hidden"
                  name="imageUrl"
                  value={imageUrl ?? undefined}
                />
                <input type="hidden" name="subName" value={params.id} />
                <CardHeader>
                  <Label>Title</Label>
                  <Input
                    required
                    name="title"
                    placeholder="Your title goes here..."
                    value={title ?? ""}
                    onChange={(e) => SetTitle(e.target.value)}
                  />
                  <TipTapEditor setJson={SetJson} json={json} />
                  {/* {imageUrl && (<Image
                      src={imageUrl}
                      alt="Uploaded Image"
                      width={625}
                      height={100}
                    />)} */}
                </CardHeader>
                <CardFooter>
                  <SubmitButton text="Create Post" />
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="image">
            <Card>
              <CardHeader>
                {!imageUrl ? (<UploadDropzone
                  className="ut-button:bg-primary ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary"
                  onClientUploadComplete={(res) => {
                    SetImageUrl(res[0].url);
                  }}
                  endpoint="imageUploader"
                  onUploadError={(error: Error) => {
                    alert(Error);
                  }}
                />) : (<Image
                      src={imageUrl}
                      alt="Uploaded Image"
                      width={625}
                      height={100}
                      className=" h-80 rounded-lg w-full object-contain "
                    />)}
                
                
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className=" w-[35%]">
        <Card className="flex flex-col p-4">
          <div className=" flex items-center gap-x-2">
            <Image className=" size-10" src={pfp} alt="pfp" />
            <h1 className=" font-medium">Posting to Reddit</h1>
          </div>
          <Separator className="mt-2" />
          <div className=" flex flex-col gap-y-5 mt-5">
            {rules.map((item) => {
              return (
                <div key={item.id}>
                  <p className="text-sm font-medium">
                    {item.id}. {item.text}
                  </p>
                  <Separator className="mt-2" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default page;
