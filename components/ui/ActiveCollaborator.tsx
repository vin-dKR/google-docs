import { useOthers } from '@liveblocks/react/suspense'
import Image from 'next/image'
import React from 'react'

const ActiveCollaborator = () => {
    const others = useOthers()
    const collaborators = others.map((other) => other.info)

    return (
        <ul>
            {collaborators.map(({ id, avatar, name, color }) => (
                <li key={id}>
                    <Image
                        src={avatar}
                        alt={name}
                        width={40}
                        height={40}
                        className='inline-block size-8 rounded-full ring-2 ring-dark-100'
                        style={{ border: `3px solid ${color}` }}
                    />
                </li>
            ))}
        </ul>
    )
}

export default ActiveCollaborator