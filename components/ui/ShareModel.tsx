'use client'

import { useSelf } from '@liveblocks/react/suspense'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from './Button'
import Image from 'next/image'
import { Input } from './input'
import UserTypeSelector from './UserTypeSelector'
import Collaborator from './Collaborator'


function ShareModel({ roomId, collaborators, creatorId, currentUserType }: ShareDocumentDialogProps) {
    const user = useSelf()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState("")
    const [userType, setUserType] = useState<UserType>('viewer')

    const shareDocumentHandler = async () => {
        setLoading(true)
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className='gradient-blue flex h-9 gap-1 px-4' disabled={currentUserType !== 'editor'}>
                    <Image
                        src='/assets/icons/share.svg'
                        alt="share"
                        width={20}
                        height={20}
                        className="min-w-4 md:size-5"
                    />
                    <p className='mr-1 hidden sm:block'>Share</p>
                </Button>
            </DialogTrigger>
            <DialogContent className='shad-dialog'>
                <DialogHeader>
                    <DialogTitle>Manage Assess of document</DialogTitle>
                    <DialogDescription className='mb-8'>
                        Select users to give access of view and edit
                    </DialogDescription>
                </DialogHeader>
                <Label htmlFor="email" className='text-blue-100'>Your email address</Label>
                <div className='flex item-center gap-3'>
                    <div className="flex flex-1 rounded-md bg-dark-400">
                        <Input
                            id={email}
                            placeholder="Enter your email"
                            value={email}
                            className='share-input'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <UserTypeSelector
                            userType={userType}
                            setUserType={setUserType}
                        />
                        <Button
                            type="submit"
                            onClick={shareDocumentHandler}
                            className='gradient-blue flex h-full gap-2 px-5'
                        >
                            {loading ? "Loading.." : "Invite"}
                        </Button>
                    </div>
                </div>
                <div className='my-2 space-y-2'>
                    <ul className='flex flex-col'>
                        {collaborators.map((collaborator) => (
                            <Collaborator
                                key={collaborator.id}
                                roomId={roomId}
                                creatorId={creatorId}
                                email={collaborator.email}
                                collaborator={collaborator}
                                user={user.info}
                            />
                        ))}
                    </ul>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default ShareModel
