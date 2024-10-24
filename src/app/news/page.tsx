import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import NewsList from "./(components)/newsList";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
    const client = createClient();
    const page = await client.getSingle("news_page");
    const newsPosts = await client.getAllByType("news_post");

    return (
        <>
            <SliceZone slices={page.data.slices} components={components} />
            <NewsList initialNews={newsPosts} />
        </>
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const page = await client.getSingle("news_page");

    return {
        title: page.data.meta_title,
        description: page.data.meta_description,
    };
}