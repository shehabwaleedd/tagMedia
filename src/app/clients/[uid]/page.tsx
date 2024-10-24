import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import ClientDetails from "./Details";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Content } from "@prismicio/client";
type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
    const client = createClient();
    const page = await client
        .getByUID<Content.ClientsPostDocument>("clients_post", params.uid)
        .catch(() => notFound());

    return (
        <>
            <ClientDetails page={page as any} />
            <SliceZone slices={page.data.slices} components={components} />
        </>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const client = createClient();
    const page = await client
        .getByUID("clients_post", params.uid)
        .catch(() => notFound());

    return {
        title: page.data.meta_title || `Tag Media - ${page.data.title}`,
        description: page.data.meta_description || page.data.description.slice(0, 157).toString(),
    };
}

export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("clients_post");

    return pages.map((page) => {
        return { uid: page.uid };
    });
}