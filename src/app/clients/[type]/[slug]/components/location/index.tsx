'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import styles from '../../page.module.scss'
const CurrentLocation = () => {

    const pathname = usePathname()

    const asPathWithoutQuery = pathname.split("?")[0]
    const asPathNestedRoutes = asPathWithoutQuery.split("/").filter(v => v.length > 0)

    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
        const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/")
        return { href, text: subpath }
    })

    return (
        <nav className={styles.breadcrumbs}>
            {crumblist.map((crumb, idx) => (
                <React.Fragment key={crumb.href}>
                    {idx > 0 && <span className={styles.separator}> &gt; </span>}
                    {idx === crumblist.length - 1 ? (
                        <span className={styles.currentPage}>
                            {crumb.text}
                        </span>
                    ) : (
                        <a href={crumb.href} className={styles.crumbLink}>
                            {crumb.text}
                        </a>
                    )}
                </React.Fragment>
            ))}
        </nav>
    )
}
export default CurrentLocation