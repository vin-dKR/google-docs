import CollaborativeRoom from '@/components/ui/CollaborativeRoom'
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

  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write') ? 'editor' : 'viewer'
  })) 

  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className='mx-24'>
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