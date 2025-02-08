import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import NewsDetails from "../(components)/newsDetails";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import styles from "./page.module.scss";
type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
    const client = createClient();
    const page = await client
        .getByUID("news_post", params.uid)
        .catch(() => notFound());

    return (
        <main className={styles.main}>
            <NewsDetails news={page} />
            <SliceZone slices={page.data.slices} components={components} />
        </main>
    )
}

export async function generateMetadata({ params }: { params: Params; }): Promise<Metadata> {
    const client = createClient();
    const page = await client.getByUID("news_post", params.uid).catch(() => notFound());

    return {
        title: page.data.title,
        description: page.data.description,
        openGraph: {
            title: page.data.title || "News | Tag Media",
            description: page.data.description || "Explore the latest news and updates from Tag Media",
            images: [
                { url: page.data.mainimage?.url || "" }
            ]
        }
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("news_post");
    return pages.map((page) => {
        return { uid: page.uid };
    });
}