'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import UserTypeSelector from './UserTypeSelector'
import { Button } from './ui/Button'
import { removeCollaborator, updateDocumentAccess } from '@/lib/actions/room.action'

function Collaborator({ roomId, creatorId, email, collaborator, user }: CollaboratorProps) {
  const [userType, setUserType] = useState(collaborator.userType || 'viewer')
  const [loading, setLoading] = useState(false)

  const shareDocumentHandler = async (type: string) => {
    setLoading(true)

    await updateDocumentAccess({
      email,
      roomId,
      userType: type as UserType,
      updatedBy: user
    })

    setLoading(false)
  }

  const deleteDocumentHandler = async (email: string) => {
    setLoading(true)

    await removeCollaborator({
      roomId,
      email
    })

    setLoading(false)
  }

  return (
    <li className='flex item-center justify-between gap-2 py-3'>
      <div className='flex gap-2'>
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className='size-9 rounded-full'
        />
        <div>
          <p className='line-clamp-1 text-sm font-semibold leading-4 text-white'>
            {collaborator.name}
            <span className='text-10-regular pl-2 text-blue-100'>
              {loading && "updating..."}
            </span>
          </p>
          <p className='text-sm font-light text-blue-100'>
            {collaborator.email}
          </p>
        </div>
      </div>
      {creatorId === collaborator.id ? (
        <p className='text-blue-100 text-sm'>Owner</p>
      ) : (
        <div className='flex item-center'>
          <UserTypeSelector
            userType={userType as UserType}
            setUserType={setUserType || 'viewer'}
            onClickHandler={shareDocumentHandler}
          />
          <Button type='button' onClick={() => deleteDocumentHandler(collaborator.email)}>
            Remove
          </Button>
        </div>
      )}
    </li>
  )
}

export default Collaborator
