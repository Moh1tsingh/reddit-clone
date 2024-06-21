"use client"
import React, { useEffect } from "react";
import { updateSubDescription } from "../actions";
import { SaveButton } from "./SubmitButton";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { useToast } from "@/components/ui/use-toast";

interface iAppProps {
  subName: string;
  description: string | null | undefined;
}

const initialState = {
  status: "",
  message: "",
};

function SubDescriptionFrom({ subName, description }: iAppProps) {
  const [state, formAction] = useFormState(updateSubDescription, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "green") {
      toast({ title: "Successfull", description: state.message });
    } else if (state.status === "error") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  return (
    <div>
      <form action={formAction} className=" m-2 ">
        <input type="hidden" name="subName" value={subName} />
        <Textarea
          name="description"
          defaultValue={
            description ?? "Create a description for your subreddit."
          }
          maxLength={100}
        />
        <SaveButton text="Save" />
      </form>
    </div>
  );
}

export default SubDescriptionFrom;
