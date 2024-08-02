import AddDocumentBtn from "@/components/ui/AddDocumentBtn";
import Header from "@/components/ui/Header";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const clerkUser = await currentUser()

  if(!clerkUser) redirect("/sign-in")


  const documents = []
  return (
    <main className="home-container">
      {/* Home navbar */}
      <Header className="sticky top-0 left-0" >
        <div className="flex items-center gap-2 lg:gap-4">
          Notifiction
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {documents.length > 0 ? (
        <div className="docs-list-empty">
          <h1>jdsjfkldj</h1>
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
