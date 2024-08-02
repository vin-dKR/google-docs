"use server";

import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";

export const createRoomDocument = async ({ userId, email } : CreateDocumentParams) => {
    const roomId = nanoid();

    try {
        const metadata = {
            creatorId: userId,
            email,
            title: "Untitled",
        }

        const usersAccesses: RoomAccesses = {
            [email]: ['room:write'],
        }

        const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses,
            defaultAccesses: [],
          });

          revalidatePath('/');
    } catch (error) {
        console.log("ROOM_CREATE_ERROR", error);
    }
}