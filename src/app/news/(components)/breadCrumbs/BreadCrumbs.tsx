'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './style.module.scss'


type NewsCardProps = {
    data: any
}

const BreadCrumbs: React.FC<NewsCardProps> = ({ data }) => {
    const pathname = usePathname()

    const generateBreadcrumbs = () => {
        const asPathWithoutQuery = pathname.split("?")[0]
        const asPathNestedRoutes = asPathWithoutQuery.split("/").filter(v => v.length > 0)

        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/")
            let text = subpath

            if (subpath === 'news') {
                text = 'News'
            } else if (subpath === 'projects') {
                text = 'Projects'
            }

            return { href, text }
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
                            {data?.data.title || crumb.text}
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

export default BreadCrumbs