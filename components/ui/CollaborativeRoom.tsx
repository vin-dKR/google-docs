'use client'

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react"
import Loader from "./Loader"
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/ui/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import ActiveCollaborator from "./ActiveCollaborator"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Input } from "./input"
import { updateDocument } from "@/lib/actions/room.action"

function CollaborativeRoom({ roomId, roomMetadata }: CollaborativeRoomProps) {
    const currentEditorType = "editor"
    const [documentTitle, setDocumentTitle] = useState(roomMetadata?.title || "Untitled")
    const [loading, setLoading] = useState(false)
    const [editing, setEditing] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setLoading(true)

            try {
                if(documentTitle !== roomMetadata.title) {
                    const updatedDocument = await updateDocument(roomId, documentTitle);
                    console.log(updatedDocument)

                    if(updatedDocument) {
                        setEditing(false)
                    }
                }
            } catch (error) {
                console.log(`Error happened while updating a room: ${error}`);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if(containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setEditing(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        if(editing && inputRef.current) {
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
                                    ref={inputRef}
                                    value={documentTitle}
                                    placeholder="Untitled"
                                    onChange={(e) => setDocumentTitle(e.target.value)}
                                    onKeyDown={updateTitleHandler}
                                    disabled={!editing}
                                    className="document-title-input"
                                />
                            ) : (
                                <>
                                    <p>Untitled</p>
                                </>
                            )}

                            {currentEditorType === "editor" && !editing && (
                                <Image
                                    src="/assets/icons/edit.svg"
                                    alt="edit"
                                    width={20}
                                    height={20}
                                    onClick={() => setEditing(true)}
                                    className="pointer"
                                />
                            )}

                            {currentEditorType !== "editor" && !editing && (
                                <p>View Only</p>
                            )}

                            {loading && <p className="text-sm text-gray-500">Saving...</p>}
                        </div>
                        <div className='flex w-full flex-1 justify-end gap-2 sm:gap-3'>
                            <ActiveCollaborator />
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </Header>
                    <Editor />
                </div>
            </ClientSideSuspense>
        </RoomProvider>
    )
}

export default CollaborativeRoom