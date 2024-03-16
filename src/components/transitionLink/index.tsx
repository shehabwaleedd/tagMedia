"use client"
import { usePathname, useRouter } from "next/navigation"
import { animatePageOut } from "@/animation/transition"
import Link from 'next/link';

interface Props {
    href: string
    label: string
}

const TransitionLink = ({ href, label }: Props) => {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = () => {
        if (pathname !== href) {
            animatePageOut(href, router)
        }
    }

    return (
        <Link href={href}
            className="text-xl text-neutral-900 hover:text-neutral-700"
            onClick={handleClick}
        >
            {label}
        </Link>
    )
}

export default TransitionLink