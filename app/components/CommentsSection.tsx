"use client"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useRef } from 'react'
import { SubmitButton } from './SubmitButton'
import { createComment } from '../actions';

function CommentsSection({postId}:{postId:string}) {
    const ref = useRef<HTMLFormElement>(null)
  return (
    <form action={async (formData)=>{ await createComment(formData); ref.current?.reset()}} className="mt-5 " ref={ref}>
      <input type="hidden" name="postId" value={postId} />
      <Label>Comment as yourself</Label>
      <Textarea
        placeholder="What are your thoughts?"
        className=" w-full mt-1 mb-2"
        name="comment"
      />
      <SubmitButton text="Comment" />
    </form>
  );
}

export default CommentsSection