import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/login', '/account'],
        },
        sitemap: 'https://www.tagmediaeg.com/sitemap.xml',
    }
}