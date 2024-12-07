'use client' 
 
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
//   useEffect(() => {
//     // Log the error to an error reporting service
//     console.error(error)
//   }, [error])
 
  return (
    <main className=' min-h-screen flex justify-center items-center w-full'>



 <div className=' flex flex-col gap-2 items-center'>
  <Image src="/images/error.svg" alt='Error' width={600} height={600} />
 <h2 className=' text-4xl '>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }

        className=' bg-terniary hover:bg-terniary/90 text-terniary-foreground'
      >
        Try again
      </Button>
 </div>
    </main>
  )
}