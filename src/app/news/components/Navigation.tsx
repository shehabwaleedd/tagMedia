'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NewsType } from '@/types/common'
import styles from '../page.module.scss'

type NewsCardProps = {
    newsDetails: NewsType
}

const Navigation: React.FC<NewsCardProps> = ({ newsDetails }) => {
    const pathname = usePathname()

    const generateBreadcrumbs = () => {
        const asPathWithoutQuery = pathname.split("?")[0]
        const asPathNestedRoutes = asPathWithoutQuery.split("/").filter(v => v.length > 0)

        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/")
            return { href, text: subpath }
        })

        return [{ href: "/", text: "Home" }, ...crumblist]
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <nav className={styles.breadcrumbs}>
            {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={crumb.href}>
                    {idx > 0 && <span className={styles.separator}> &gt; </span>}
                    {idx === breadcrumbs.length - 1 ? (
                        <span className={styles.currentPage}>
                            {newsDetails?.title || crumb.text}
                        </span>
                    ) : (
                        <Link href={crumb.href} className={styles.crumbLink}>
                            {crumb.text}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    )
}

export default Navigation