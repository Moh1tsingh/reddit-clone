"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({text}:{text:string}) {
  const {pending} = useFormStatus()
  return (
    <>
      {pending ? (
        <Button disabled className=" flex items-center gap-x-2">
          Please wait
          <Loader2 className=" size-4 animate-spin" />
          
        </Button>
      ) : (
        <Button type="submit">{text}</Button>
      )}
    </>
  );
}

export function SaveButton({text}:{text:string}){
  const {pending} = useFormStatus()
  return <>
    {pending ? (
      <Button disabled className=" mt-2 w-full" size={"sm"}>
        Please wait
        <Loader2 className=" size-4 animate-spin" />
      </Button>
    ) : (
      <Button type="submit" size={"sm"} className=" w-full mt-2">{text}</Button>
    )}
  </>;
}

export function UpVoteButton(){
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={"outline"}  size={"icon"}>
          <Loader2 className=" size-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={"outline"} size={"sm"} type="submit">
          <ArrowUp className="size-4" />
        </Button>
      )}
    </>
  );
}

export function DownVoteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant={"outline"} size={"icon"}>
          <Loader2 className=" size-4 animate-spin" />
        </Button>
      ) : (
        <Button variant={"outline"} size={"sm"} type="submit">
          <ArrowDown className="size-4" />
        </Button>
      )}
    </>
  );
}