'use client'

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react"
import Loader from "./Loader"
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/ui/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import ActiveCollaborator from "./ActiveCollaborator"

function CollaborativeRoom({ roomId, roomMetadata }: CollaborativeRoomProps) {
    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader />}>
                <div className="collaborative-room">
                    <Header>
                        <div className='flex w-fit items-center justify-center gap-2'>
                            <p className='text-white document-title'>Share</p>
                        </div>
                        <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
                            <ActiveCollaborator />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom