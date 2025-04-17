import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import styles from "../page.module.scss"
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
    try {
        const client = createClient();
        const page = await client
            .getByUID("page", params.uid)
            .catch(() => notFound());

        if (!page.data?.slices) {
            console.error(`Missing slices data for page: ${params.uid}`);
            return <main className={styles.main}><div>Page content unavailable</div></main>;
        }

        return (
            <main className={styles.main}>
                <SliceZone slices={page.data.slices} components={components} />
            </main>
        );
    } catch (error) {
        console.error(`Error rendering page ${params.uid}:`, error);
        notFound();
    }
}

export async function generateMetadata({ params, }: { params: Params; }): Promise<Metadata> {
    try {
        const client = createClient();
        const page = await client
            .getByUID("page", params.uid)
            .catch(() => notFound());

        return {
            title: page.data.meta_title || `${params.uid.charAt(0).toUpperCase() + params.uid.slice(1)}`,
            description: page.data.meta_description || "",
            metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.tagmediaeg.com"),
        };
    } catch (error) {
        console.error(`Error generating metadata for ${params.uid}:`, error);
        return {
            title: `${params.uid.charAt(0).toUpperCase() + params.uid.slice(1)}`,
            description: "",
        };
    }
}
export async function generateStaticParams(): Promise<Array<{ uid: string }>> {
    try {
        const client = createClient();
        const pages = await client.getAllByType("page");

        return pages
            .filter(page => page && page.uid && page.uid !== "projects")
            .map(page => ({ uid: page.uid }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}