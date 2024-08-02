'use client'
import React from 'react'
import { LiveblocksProvider, ClientSideSuspense } from '@liveblocks/react'
import Loader from '@/components/ui/Loader'

function Provider({ children }: HeaderProps) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      {/* <RoomProvider id="my-room"> */}
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
      {/* </RoomProvider> */}
    </LiveblocksProvider>
  )
}

export default Provider