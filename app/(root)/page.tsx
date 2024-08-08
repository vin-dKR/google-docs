import AddDocumentBtn from "@/components/AddDocumentBtn";
import { DeleteModal } from "@/components/DeleteModel";
import DocumentLink from "@/components/DocumentLink";
import Header from "@/components/Header";
import Notifications from "@/components/Notifications";
import { getDocuments } from "@/lib/actions/room.action";
import { dateConverter } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect("/sign-in")

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress)

  return (
    <main className="home-container">
      {/* Home navbar */}
      <Header className="sticky top-0 left-0" >
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {/* main list of docs room  */}
      {roomDocuments.data.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">
              All Documents
            </h3>
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress} />
          </div>
          <ul className="document-ul">
            {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
              <li key={id} className="document-list-item">
                {/* document room card --> title + delete */}
                <DocumentLink id={id} title={metadata.title} createdAt={createdAt} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="docs-list-empty flex flex-col items-center justify-center gap-2 mt-8">
          <Image
            src="/assets/icons/logo.svg"
            alt="empty-docs"
            width={40}
            height={40}
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-semibold">Welcome to !</h2>
            <p className="text-sm text-muted-foreground">Get started by creating a new document</p>
          </div>
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress} />
        </div>
      )}
    </main>

  );
}
