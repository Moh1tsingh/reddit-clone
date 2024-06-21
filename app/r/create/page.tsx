"use client";
import { createCommunity } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";

const initailState = {
  message: "",
  status: "",
};

function Page() {
  const [state, formAction] = useFormState(createCommunity, initailState);

  return (
    <div className=" max-w-[1000px] mx-auto flex flex-col mt-4">
      <form action={formAction}>
        <h1 className=" text-3xl font-extrabold tracking-tight text-primary">
          Create Community
        </h1>
        <Separator className="my-4" />
        <Label className=" text-lg">Name</Label>
        <p className=" text-muted-foreground">
          Community names including capitalization cannot be changed.
        </p>
        <div className=" mt-3 relative">
          <p className=" absolute w-8 flex justify-center items-center text-muted-foreground left-0 h-full">
            /r
          </p>
          <Input
            className=" pl-6"
            name="name"
            required
            minLength={2}
            maxLength={21}
          />
        </div>
        {state.status === "error" && (
          <p className=" text-red-500 ">Community name already taken!</p>
        )}
        <div className="w-full flex gap-x-5 mt-5 justify-end">
          <Button variant={"secondary"} type="button" asChild>
            <Link href={"/"}>Cancel</Link>
          </Button>
          <SubmitButton text={"Create Community"} />
        </div>
      </form>
    </div>
  );
}

export default Page;
