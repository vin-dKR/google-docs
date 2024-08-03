'use client'
import React from 'react'
import { LiveblocksProvider, ClientSideSuspense } from '@liveblocks/react'
import Loader from '@/components/ui/Loader'
import { getClerkUsers } from '@/lib/actions/user.action'

function Provider({ children }: HeaderProps) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth" resolveUsers={async ({ userIds }) => {
      const users = await getClerkUsers({ userIds })
      return users
    }}>
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider