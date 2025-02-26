import { Metadata } from "next";
import NewsList from "./(components)/newsList";
import { createClient } from "@/prismicio";
export default async function Page() {
    const client = createClient();
    const newsPosts = await client.getAllByType("news_post");

    return (
        <NewsList initialNews={newsPosts} />
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const page = await client.getSingle("news_page");

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
        openGraph: {
            title: page.data.meta_title || "News | Tag Media",
            description: page.data.meta_description || "Explore the latest news and updates from Tag Media",
            images: [
                { url: page.data.meta_image?.url || "" }
            ]
        }
    };
}