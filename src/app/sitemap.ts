import { MetadataRoute } from 'next';
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';

interface UrlObject {
    url: string;
    lastmod: string;
    changefreq: "weekly" | "yearly" | "always" | "hourly" | "daily" | "monthly" | "never";
    priority: number;
}

interface BlogItem {
    _id: string;
    title: string;
    slug: string;
    createdAt: string;
}

interface BlogResponse {
    page: number;
    pageNumber: number;
    result: BlogItem[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.tagmediaeg.com';

    let actorUrls: UrlObject[] = [];
    let portfolioUrls: UrlObject[] = [];
    let newsUrls: UrlObject[] = [];

    try {
        const actors = await serverDynamicFetch('partner');
        const portfolioItems = await serverDynamicFetch('portfolio');
        const blogResponse = await serverDynamicFetch('blog') as BlogResponse;
        if (Array.isArray(actors)) {
            actorUrls = actors.map((actor: any) => ({
                url: `${baseUrl}/work/actor/${actor._id}/${actor.slug}`,
                lastmod: new Date(actor.createdAt).toISOString(),
                changefreq: 'monthly',
                priority: 0.7,
            }));
        }

        if (Array.isArray(portfolioItems)) {
            portfolioUrls = portfolioItems.map((item: any) => ({
                url: `${baseUrl}/work/${item.slug}`,
                lastmod: new Date(item.createdAt).toISOString(),
                changefreq: 'monthly',
                priority: 0.7,
            }));
        }

        if (blogResponse && Array.isArray(blogResponse.result)) {
            newsUrls = blogResponse.result.map((article: BlogItem) => ({
                url: `${baseUrl}/news/${article.slug}`,
                lastmod: new Date(article.createdAt).toISOString(),
                changefreq: 'weekly',
                priority: 0.6,
            }));
        }

    } catch (error) {
        console.error('Error fetching dynamic data:', error);
    }

    const staticUrls: UrlObject[] = [
        { url: `${baseUrl}`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 1 },
        { url: `${baseUrl}/home`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/about`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/work`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/news`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: 0.8 },
        { url: `${baseUrl}/contact`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.7 },
    ];

    console.log('URLs generated:', {
        staticUrls: staticUrls.length,
        actorUrls: actorUrls.length,
        portfolioUrls: portfolioUrls.length,
        newsUrls: newsUrls.length
    });

    return [
        ...staticUrls,
        ...actorUrls,
        ...portfolioUrls,
        ...newsUrls,
    ];
}

const slugify = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
};