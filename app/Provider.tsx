'use client'
import React from 'react'
import { LiveblocksProvider, ClientSideSuspense } from '@liveblocks/react'
import Loader from '@/components/ui/Loader'
import { getClerkUsers } from '@/lib/actions/user.action'
import { getDocumentUsers } from '@/lib/actions/room.action'
import { useUser } from '@clerk/nextjs'

function Provider({ children }: HeaderProps) {
  const {user: clerkUser} = useUser()
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds })
        return users
      }}
      resolveMentionSuggestions={async ({text, roomId}) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text
        })
        return roomUsers
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider