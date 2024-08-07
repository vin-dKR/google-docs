'use client'

import React from 'react'
import { Button } from './Button'
import Image from 'next/image'
import { createDocument } from '@/lib/actions/room.action'
import { useRouter } from 'next/navigation'

function AddDocumentBtn({ userId, email }: AddDocumentBtnProps) {
    const router = useRouter()

    const addDocumentHandler = async () => {
        try {
            const room = await createDocument({ userId, email });

            if (room) {
                console.log(room.id)
                router.push(`/documents/${room.id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Button type='submit' onClick={addDocumentHandler} className='gradient-blue flex gap-1 shadow-md'>
            <Image src="/assets/icons/add.svg" alt="add-doc" width={30} height={30} />
            <p className='hidden sm:block'>Start Writing</p>
        </Button>
    )
}

export default AddDocumentBtn