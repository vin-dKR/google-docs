import CollaborativeRoom from '@/components/ui/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.action'
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

  return (
    <main className='mx-24'>
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.roomMetadata}
        users={room.users}
        currentUserType={room.currentUserType}
      />
    </main>
  )
}

export default Document