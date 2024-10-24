import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import AnimatedGrid from "@/slices/AnimatedGrid";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
    const client = createClient();
    const page = await client.getSingle("clients");
    const clientsPosts = await client.getAllByType("clients_post");

    return (
        <>
            <SliceZone slices={page.data.slices} components={components} />
            <AnimatedGrid posts={clientsPosts} />
        </>
);
}

export async function generateMetadata(): Promise<Metadata> {
    const client = createClient();
    const page = await client.getSingle("clients");
    

    return {
        title: page.data.meta_title || "Clients | Tag Media",
        description: page.data.meta_description || "Explore the innovative projects and success stories by Tag Media, Egypt's leader in digital and influencer marketing.",
    };
}