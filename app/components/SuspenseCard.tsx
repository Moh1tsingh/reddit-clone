import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function SuspenseCard() {
  return (
    <div>
        <Skeleton className=' w-full h-[400px]'/>
        <Skeleton className=' w-full h-[400px]'/>
        <Skeleton className=' w-full h-[400px]'/>
        <Skeleton className=' w-full h-[400px]'/>
    </div>
  )
}

export default SuspenseCard