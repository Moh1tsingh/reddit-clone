"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useEffect, useState } from "react";
import { updateUsername } from "../actions";
import { SubmitButton } from "./SubmitButton";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";


const initailState = {
  message:"",
  status:""
}

export default function ({ username }: { username: string }) {
  const [userName, setUserName] = useState("");
  const [state,formAction] = useFormState( updateUsername ,initailState)
  const {toast} = useToast()
  
  useEffect(()=>{
    if(state.status === "green"){
      toast({title:"Successfull",description:state.message})
    }else if(state.status === "error"){
      toast({title:"Error",description:state.message,variant:"destructive"})
    }
  },[state, toast])

  return (
    <form action={formAction}>
      <h1 className=" font-bold text-3xl tracking-tight">Settings</h1>
      <Separator className=" my-4" />
      <Label className=" text-lg">Username</Label>
      <p className="text-muted-foreground">
        Here you can change your username to anything!
      </p>
      <Input
        name="username"
        required
        className="mt-2"
        minLength={2}
        maxLength={18}
        defaultValue={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      {state.status==="error" && (<p className="text-red-500 mt-1">{state.message}</p>)}
      <div className=" w-full flex justify-end mt-5 gap-x-5">
        <Button variant={"secondary"} asChild type="button">
          <Link href={"/"}>Cancel</Link>
        </Button>
        <SubmitButton text="Change Username" />
      </div>
    </form>
  );
}
