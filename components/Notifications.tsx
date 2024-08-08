'use client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from "@liveblocks/react-ui"
import { useInboxNotifications, useUnreadInboxNotificationsCount } from "@liveblocks/react/suspense"
import Image from "next/image"
import { ReactNode } from "react"


function Notifications() {
    const { inboxNotifications } = useInboxNotifications()
    const { count } = useUnreadInboxNotificationsCount()

    const unreadNotifications = inboxNotifications.filter((not: any) => !not.readAt)

    return (
        <Popover>
            <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
                <Image
                    src='/assets/icons/bell.svg'
                    alt="bell"
                    width={24}
                    height={24}
                />
                {count > 0 && (
                    <div className="absolute right-2 top-2 z-2 size-2 rounded-full bg-blue-500" />
                )}
            </PopoverTrigger>
            <PopoverContent align="end" className="shad-popover">
                <LiveblocksUIConfig
                    overrides={{
                        INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
                            <>{user} mentioned you.</>
                        )
                    }}
                >
                    <InboxNotificationList>
                        {unreadNotifications.length <= 0 && (
                            <p className="py-2 text-center text-dark-500">Notifications</p>
                        )}

                        {unreadNotifications.length > 0 && unreadNotifications.map((not) => (
                            <InboxNotification
                                key={not.id}
                                inboxNotification={not}
                                className="bg-dark-200 text-white"
                                href={`/documents/${not.roomId}`}
                                showActions={false}
                                kinds={{
                                    thread: (props) => (
                                        <InboxNotification.Thread {...props}
                                            showActions={false}
                                            showRoomName={false}
                                        />
                                    ),
                                    textMention: (props) => (
                                        <InboxNotification.TextMention {...props}
                                            showRoomName={false}
                                        />
                                    ),
                                    $documentAccess: (props) => (
                                        <InboxNotification.Custom {...props} title={props.inboxNotification.activities[0].data.title} aside={
                                            <InboxNotification.Icon className="bg-transparent" >
                                                <Image
                                                    src={props.inboxNotification.activities[0].data.avatar as string || ""}
                                                    alt="avatar"
                                                    width={36}
                                                    height={36}
                                                    className="rounded-full"
                                                />
                                            </InboxNotification.Icon>}>
                                            {props.children}
                                        </InboxNotification.Custom>
                                    )
                                }}
                            />
                        ))}
                    </InboxNotificationList>
                </LiveblocksUIConfig>
            </PopoverContent>
        </Popover>

    )
}

export default Notifications