'use client'
import AddAccount from "@/app/interfaces/forms/addAccount";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";



export default function Modal({children}:{children?:React.ReactNode}) {
    const router = useRouter()

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-96 shadow-lg rounded-md bg-white relative h-[80vh] overflow-y-scroll">
                <button className="absolute top-1 right-1" onClick={router.back}>
                    <MdClose className="h-6 w-6 text-red-800" />
                </button>
                {children}

            </div>
        </div>
    );
}