'use client'
import React from 'react'
import { LiveblocksProvider, ClientSideSuspense } from '@liveblocks/react'
import Loader from '@/components/ui/Loader'

function Provider({ children }: HeaderProps) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider