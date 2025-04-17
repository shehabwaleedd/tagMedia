import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import AnimatedGrid from "@/slices/AnimatedGrid";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import * as prismic from "@prismicio/client";

async function getClientsData() {
    const client = createClient();
    const clientsPage = await client.getSingle("clients");

    const orderedActorIds = clientsPage.data.featured_actors
        ?.map(item => item.actor?.id)
        .filter(Boolean) || [];

    const orderedSeriesIds = clientsPage.data.featured_series
        ?.map(item => item.series?.id)
        .filter(Boolean) || [];

    const allFeaturedIds = [...orderedActorIds, ...orderedSeriesIds];

    if (allFeaturedIds.length === 0) {
        return [];
    }

    const featuredPosts = await Promise.all(
        allFeaturedIds.map(id => id ? client.getByID(id) : null)
    );

    return featuredPosts.filter(Boolean);
}

export default async function Page() {
    const client = createClient();
    const page = await client.getSingle("clients");
    const featuredPosts = await getClientsData();

    const typedPosts = featuredPosts as prismic.PrismicDocument<any, string, string>[];

    return (
        <>
            <SliceZone slices={page.data.slices} components={components} />
            <AnimatedGrid posts={typedPosts} />
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