import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Tag Media',
        short_name: 'tag-media',
        description: "Tag Media is Egypt's pioneer in digital and influencer marketing. We transform brands to power growth.",
        lang: 'en',
        start_url: '/',
        display: 'standalone',
        background_color: '#161616',
        theme_color: '#161616',
        scope: '.',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '16x16 32x32', 
                type: 'image/x-icon',
            },
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: '/android-chrome-512x512.png', 
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'  
            },
            {
                src: '/apple-touch-icon.png',
                sizes: '180x180',
                type: 'image/png',
            },
            {
                src: '/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                src: '/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                src: '/maskable-icon.png',
                sizes: '196x196',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/maskable-icon.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/maskable-icon-512x512.png', 
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
        ],


    }
}