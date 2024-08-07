import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.action'
import { getClerkUsers } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Document = async ({ params: { id } }: SearchParamProps) => {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    return redirect('/sign-in')
  }

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress
  })

  if(!room) {
    return redirect('/')
  }

  const userIds = Object.keys(room.usersAccesses)
  const users = await getClerkUsers({ userIds })

  const usersData = users.map((user: User) => {
    if (!user) return null; // Skip if user is null or undefined
    const userEmail = user.email; // Store user email in a variable
    return {
      ...user,
      userType: userEmail && room.usersAccesses[userEmail]?.includes('room:write')
        ? 'editor'
        : 'viewer'
    }
  }).filter(Boolean); // Remove any null entries

  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  )
}

export default Document