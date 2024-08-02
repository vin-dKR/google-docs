import { Editor } from '@/components/editor/Editor'
import Header from '@/components/ui/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Document = () => {
  return (
    <div className='mx-24'>
      <Header>
        <div className='flex w-fit items-center justify-center gap-2'>
          <p className='text-white document-title'>Document</p>
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Header>
      <Editor />
    </div>
  )
}

export default Document