"use client"; // Mark this as a client component

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dateConverter } from "@/lib/utils";
import Loader from "./ui/Loader";
import { DeleteModal } from "./DeleteModel";

interface DocumentLinkProps {
    id: string;
    title: string;
    createdAt: string;
}

const DocumentLink: React.FC<DocumentLinkProps> = ({ id, title, createdAt }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            window.location.href = `/documents/${id}`; // Redirect to the document
        }, 100); // Adjust delay as needed
    };

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className="flex flex-1 items-center gap-4">
            <Link href="#" onClick={handleClick} className="flex flex-1 items-center gap-4">
                <div className="hidden rounded-md bg-dark-500 sm">
                    <Image
                        src='/assets/icons/doc.svg'
                        alt="file"
                        width={40}
                        height={40}
                    />
                </div>
                <div className="space-y-1">
                    <p className="line-clamp-1 lext-lg">{title}</p>
                    <p className="text-sm font-light text-blue-100">Created About {dateConverter(createdAt)}</p>
                </div>
            </Link>
            <DeleteModal roomId={id} />
        </div>
    );
};

export default DocumentLink;