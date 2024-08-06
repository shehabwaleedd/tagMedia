"use client";
import { usePathname, useRouter } from "next/navigation";
import { animatePageIn } from "../../animation/animatePageOut"
import styles from "../../components/navbar/style.module.scss"
import Link from "next/link";

export const TransitionLink = ({ href, label }: { href: string, label: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageIn(href, router);
        }
    };

    return (
        <button onClick={handleClick} aria-label={label}>
            {label}
        </button>
    );
};

export const TransitionLogo = ({ href, label }: { href: string, label: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageIn(href, router);
        }
    };

    return (
        <span onClick={handleClick} style={{ cursor: 'pointer' }} aria-label={label}>
            {label}
        </span>
    );
};


export const TransitionH4 = ({ href, label }: { href: string, label: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageIn(href, router);
        }
    };

    return (
        <div className={styles.navbar__links_user_btn}>
            <h4 onClick={handleClick} aria-label={label}>
                {label}
            </h4>
        </div>
    );
}

export const TransitionButton = ({ href, label }: { href: string, label: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageIn(href, router);
        }
    };

    return (
        <button onClick={handleClick} aria-label={label}>
            {label}
        </button>
    );
}

export const TransitionCard = ({ href, children, className }: { href: string; children: React.ReactNode, className: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageIn(href, router);
        }
    };

    return (
        <div onClick={handleClick} className={className} style={{ cursor: 'pointer' }}>
            {children}
        </div>
    );
}


export const TransitionP = ({ href, children, label }: { href: string; children: React.ReactNode, label: string }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageIn(href, router);
        }
    };

    return (
        <p onClick={handleClick} aria-label={label}>
            {children}
        </p>
    );
}