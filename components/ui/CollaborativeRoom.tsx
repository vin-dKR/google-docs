'use client'

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react"
import Loader from "./Loader"
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/ui/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

function CollaborativeRoom() {
    return (
        <RoomProvider id="my-room">
            <ClientSideSuspense fallback={<Loader />}>
                <div className="collaborative-room">
                    <Header>
                        <div className='flex w-fit items-center justify-center gap-2'>
                            <p className='text-white document-title'>Share</p>
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
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom