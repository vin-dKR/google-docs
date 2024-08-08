'use client'

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react"
import Loader from "./ui/Loader"
import { Editor } from './editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import ActiveCollaborator from "./ActiveCollaborator"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Input } from "./ui/input"
import { updateDocument } from "@/lib/actions/room.action"
import ShareModel from "./ShareModel"

function CollaborativeRoom({ roomId, roomMetadata, users, currentUserType }: CollaborativeRoomProps) {
    const [documentTitle, setDocumentTitle] = useState(roomMetadata?.title || "un-titled")
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setLoading(true);

            try {
                if (documentTitle !== roomMetadata.title) {
                    const updatedDocument = await updateDocument(roomId, documentTitle);

                    if (updatedDocument) {
                        setEditing(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }

            setLoading(false);
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setEditing(false)
                updateDocument(roomId, documentTitle)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [roomId, documentTitle])

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [editing])

    return (
        <RoomProvider id={roomId}>
            <ClientSideSuspense fallback={<Loader />}>
                <div className="collaborative-room">
                    <Header>
                        <div ref={containerRef} className='flex w-fit items-center justify-center gap-2'>
                            {editing && !loading ? (
                                <Input
                                    type="text"
                                    value={documentTitle}
                                    ref={inputRef}
                                    placeholder="Enter title"
                                    onChange={(e) => setDocumentTitle(e.target.value)}
                                    onKeyDown={updateTitleHandler}
                                    disabled={!editing}
                                    className="document-title-input"
                                />
                            ) : (
                                <>
                                    <p className="document-title">{documentTitle}</p>
                                </>
                            )}

                            {currentUserType === "editor" && !editing && (
                                <Image
                                    src="/assets/icons/edit.svg"
                                    alt="edit"
                                    width={20}
                                    height={20}
                                    onClick={() => setEditing(true)}
                                    className="pointer"
                                />
                            )}

                            {/* restrict re-name */}
                            {currentUserType !== "editor" && !editing && (
                                <p>View Only</p>
                            )}

                            {loading && <p className="text-sm text-gray-500">Saving...</p>}
                        </div>
                        <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
                            <ActiveCollaborator />
                            <ShareModel
                                roomId={roomId}
                                collaborators={users}
                                creatorId={roomMetadata.creatorId}
                                currentUserType={currentUserType}
                            />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor roomId={roomId} currentUserType={currentUserType} />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom